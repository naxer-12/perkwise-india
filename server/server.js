// server/server.js
// Standalone PerkWise Backend Admin API Server
// Native Node.js HTTP implementation (zero extra dependencies required)

import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3001;
const DB_PATH = path.join(__dirname, 'data', 'db.json');

// Ensure data directory exists
const dataDir = path.dirname(DB_PATH);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Default initial data
const DEFAULT_DATA = {
  siteConfig: {
    showNotificationBar: true,
    notificationMessage: 'Zero Affiliate Bias • Verified Against Official Bank MITCs & RBI Schedules',
    showDealsHub: true,
    showCardGuide: true,
    showCalculator: true,
    showLifeOperations: true,
    showHeroSection: true,
    enableUserReviews: true,
    heroHeadline: 'Stop Leaving Money on the Table. Every Rupee, Loyalty Perk & Scheme Optimized.',
    heroSubheadline: 'India’s unbiased consumer awareness repository and mathematical personal finance compendium. Designed to optimize daily life operations, eliminate unnecessary fees, unlock member privileges, and elevate financial literacy across all strata of consumers.'
  },
  customCards: [],
  deactivatedCards: [],
  lastUpdated: new Date().toISOString()
};

function readDb() {
  try {
    if (fs.existsSync(DB_PATH)) {
      const raw = fs.readFileSync(DB_PATH, 'utf8');
      return { ...DEFAULT_DATA, ...JSON.parse(raw) };
    }
  } catch (err) {
    console.error('[DB Error] Failed to read db.json:', err);
  }
  return { ...DEFAULT_DATA };
}

function writeDb(data) {
  try {
    data.lastUpdated = new Date().toISOString();
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf8');
    notifyClients('update', { timestamp: data.lastUpdated });
    return true;
  } catch (err) {
    console.error('[DB Error] Failed to write db.json:', err);
    return false;
  }
}

// Active Server-Sent Events (SSE) connections for live push to connected frontend
const sseClients = new Set();

function notifyClients(type, payload) {
  const msg = `data: ${JSON.stringify({ type, payload, timestamp: Date.now() })}\n\n`;
  for (const client of sseClients) {
    try {
      client.write(msg);
    } catch {
      sseClients.delete(client);
    }
  }
}

// Request helper to parse JSON body
function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
      if (body.length > 5 * 1024 * 1024) { // 5MB limit
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (e) {
        reject(e);
      }
    });
    req.on('error', reject);
  });
}

const server = http.createServer(async (req, res) => {
  // CORS Headers for cross-site / separate site connection
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Origin, Accept');
  res.setHeader('Access-Control-Max-Age', '86400');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = url.pathname;

  // JSON helper
  const sendJson = (statusCode, data) => {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
  };

  try {
    // 1. Health check
    if (pathname === '/api/health' && req.method === 'GET') {
      sendJson(200, {
        status: 'ok',
        service: 'PerkWise India Backend Admin API',
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        clientsConnected: sseClients.size
      });
      return;
    }

    // 2. Real-time SSE stream for connected frontend
    if (pathname === '/api/events' && req.method === 'GET') {
      res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': '*'
      });
      res.write(`data: ${JSON.stringify({ type: 'connected', message: 'Connected to PerkWise Live Backend' })}\n\n`);
      sseClients.add(res);

      req.on('close', () => {
        sseClients.delete(res);
      });
      return;
    }

    // 3. Site Config API
    if (pathname === '/api/config') {
      const db = readDb();
      if (req.method === 'GET') {
        sendJson(200, { success: true, config: db.siteConfig, lastUpdated: db.lastUpdated });
        return;
      }
      if (req.method === 'POST') {
        const body = await parseBody(req);
        db.siteConfig = { ...db.siteConfig, ...body };
        writeDb(db);
        sendJson(200, { success: true, message: 'Config updated', config: db.siteConfig });
        return;
      }
    }

    // 4. Cards API (Custom cards & Deactivated IDs)
    if (pathname === '/api/cards') {
      const db = readDb();
      if (req.method === 'GET') {
        sendJson(200, {
          success: true,
          customCards: db.customCards || [],
          deactivatedCards: db.deactivatedCards || [],
          lastUpdated: db.lastUpdated
        });
        return;
      }
      if (req.method === 'POST') {
        const card = await parseBody(req);
        if (!card.id || !card.name) {
          sendJson(400, { success: false, error: 'Card must include id and name' });
          return;
        }

        const customCards = db.customCards || [];
        const index = customCards.findIndex(c => c.id === card.id);
        const cardToSave = {
          ...card,
          isCustom: true,
          isPublished: true,
          publishedAt: card.publishedAt || new Date().toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
          })
        };

        if (index >= 0) {
          customCards[index] = cardToSave;
        } else {
          customCards.unshift(cardToSave);
        }
        db.customCards = customCards;

        // Ensure card is not in deactivated list
        db.deactivatedCards = (db.deactivatedCards || []).filter(id => id !== card.id);
        writeDb(db);

        sendJson(200, { success: true, message: 'Card published', card: cardToSave });
        return;
      }
    }

    // 5. Toggle card active/inactive status
    const toggleMatch = pathname.match(/^\/api\/cards\/([^/]+)\/toggle$/);
    if (toggleMatch && req.method === 'POST') {
      const cardId = decodeURIComponent(toggleMatch[1]);
      const body = await parseBody(req);
      const shouldBeActive = body.active !== undefined ? Boolean(body.active) : true;

      const db = readDb();
      const deactivatedSet = new Set(db.deactivatedCards || []);

      if (shouldBeActive) {
        deactivatedSet.delete(cardId);
      } else {
        deactivatedSet.add(cardId);
      }
      db.deactivatedCards = Array.from(deactivatedSet);
      writeDb(db);

      sendJson(200, {
        success: true,
        cardId,
        isActive: shouldBeActive,
        deactivatedCards: db.deactivatedCards
      });
      return;
    }

    // 6. Delete custom card
    const deleteMatch = pathname.match(/^\/api\/cards\/([^/]+)$/);
    if (deleteMatch && req.method === 'DELETE') {
      const cardId = decodeURIComponent(deleteMatch[1]);
      const db = readDb();
      db.customCards = (db.customCards || []).filter(c => c.id !== cardId);
      db.deactivatedCards = (db.deactivatedCards || []).filter(id => id !== cardId);
      writeDb(db);
      sendJson(200, { success: true, message: 'Card deleted', cardId });
      return;
    }

    // 7. Full Bundle Export / Import for cross-site connection
    if (pathname === '/api/bundle') {
      const db = readDb();
      if (req.method === 'GET') {
        sendJson(200, {
          success: true,
          bundle: {
            siteConfig: db.siteConfig,
            customCards: db.customCards,
            deactivatedCards: db.deactivatedCards,
            exportedAt: new Date().toISOString(),
            schemaVersion: '1.0'
          }
        });
        return;
      }
      if (req.method === 'POST') {
        const body = await parseBody(req);
        if (body.siteConfig) db.siteConfig = body.siteConfig;
        if (Array.isArray(body.customCards)) db.customCards = body.customCards;
        if (Array.isArray(body.deactivatedCards)) db.deactivatedCards = body.deactivatedCards;
        writeDb(db);
        sendJson(200, { success: true, message: 'Bundle imported successfully' });
        return;
      }
    }

    // Fallback 404
    sendJson(404, { success: false, error: 'Endpoint not found' });
  } catch (err) {
    console.error('[API Server Error]', err);
    sendJson(500, { success: false, error: err.message || 'Internal Server Error' });
  }
});

server.listen(PORT, () => {
  console.log(`[PerkWise Admin Server] Running at http://localhost:${PORT}`);
  console.log(`[Endpoints] /api/health, /api/config, /api/cards, /api/bundle, /api/events`);
});
