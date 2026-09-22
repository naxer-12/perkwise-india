import type { LoungeDatabase, LoungeLocation, LoungeCardEligibility } from '../types';

export const LOUNGE_DATABASE: LoungeDatabase = {
  "metadata": {
    "lastUpdated": "2026-09-22T02:21:14.251675+00:00",
    "lastUpdatedDisplay": "September 2026",
    "verifiedSources": [
      {
        "name": "Axis Bank Mastercard Airport Lounge Access Program",
        "authority": "Axis Bank Official MITC",
        "referenceUrl": "https://www.axis.bank.in/docs/default-source/default-document-library/axis-bank-mastercard-airport-lounge-access_program.pdf?sfvrsn=349636cd_1",
        "lastAudited": "September 2026"
      },
      {
        "name": "ICICI Bank Domestic Consolidated Lounge Access Program",
        "authority": "ICICI Bank Official Schedules",
        "referenceUrl": "https://www.icici.bank.in/content/dam/icicibank/india/managed-assets/revamp-page-images/docs/pdf/domestic_consolidated_lounge_list-1.pdf",
        "lastAudited": "September 2026"
      },
      {
        "name": "IRCTC Executive Railway Lounges Directory",
        "authority": "Indian Railway Catering and Tourism Corporation",
        "referenceUrl": "https://www.irctctourism.com/ExecutiveLounge",
        "lastAudited": "September 2026"
      },
      {
        "name": "HDFC & SBI Bank MITC Schedules",
        "authority": "HDFC Bank & SBI Cards Statutory Master Schedules",
        "referenceUrl": "https://www.hdfcbank.com/personal/pay/cards/credit-cards",
        "lastAudited": "September 2026"
      }
    ]
  },
  "lounges": [
    {
      "id": "del-encalm-t1d",
      "type": "airport",
      "city": "New Delhi",
      "airportOrStation": "Indira Gandhi International Airport (DEL)",
      "terminal": "Terminal 1D (Domestic)",
      "name": "Encalm Lounge",
      "operator": "Encalm Hospitality",
      "locationDirections": "Mezzanine Level, near Food Court, After Security Hold Area",
      "accessType": "Domestic",
      "timings": "24 Hours",
      "amenities": [
        "Gourmet Hot Buffet",
        "High-Speed Wi-Fi",
        "Dedicated Workstations",
        "Flight Information Display",
        "Premium Beverages"
      ],
      "networksAccepted": [
        "Visa",
        "Mastercard",
        "RuPay",
        "Diners Club",
        "Priority Pass",
        "DreamFolks"
      ]
    },
    {
      "id": "del-encalm-t2",
      "type": "airport",
      "city": "New Delhi",
      "airportOrStation": "Indira Gandhi International Airport (DEL)",
      "terminal": "Terminal 2 (Domestic)",
      "name": "Encalm Lounge",
      "operator": "Encalm Hospitality",
      "locationDirections": "1st Floor, Near Gate 25, After Security Hold Area",
      "accessType": "Domestic",
      "timings": "24 Hours",
      "amenities": [
        "Hot Buffet",
        "Bar Counter",
        "Wi-Fi",
        "Comfortable Loungers",
        "Newspapers & Magazines"
      ],
      "networksAccepted": [
        "Visa",
        "Mastercard",
        "RuPay",
        "Diners Club",
        "Priority Pass",
        "DreamFolks"
      ]
    },
    {
      "id": "del-encalm-t3-dom",
      "type": "airport",
      "city": "New Delhi",
      "airportOrStation": "Indira Gandhi International Airport (DEL)",
      "terminal": "Terminal 3 (Domestic)",
      "name": "Encalm Lounge (Domestic)",
      "operator": "Encalm Hospitality",
      "locationDirections": "Mezzanine Level, Domestic Departures, near Gate 27",
      "accessType": "Domestic",
      "timings": "24 Hours",
      "amenities": [
        "Live Chef Counter",
        "Shower Facilities",
        "Gourmet Dining",
        "Wi-Fi",
        "Recliners",
        "Bar Service"
      ],
      "networksAccepted": [
        "Visa",
        "Mastercard",
        "RuPay",
        "Diners Club",
        "Priority Pass",
        "DreamFolks"
      ]
    },
    {
      "id": "del-encalm-t3-intl",
      "type": "airport",
      "city": "New Delhi",
      "airportOrStation": "Indira Gandhi International Airport (DEL)",
      "terminal": "Terminal 3 (International)",
      "name": "Encalm Lounge (International)",
      "operator": "Encalm Hospitality",
      "locationDirections": "Mezzanine Level, International Departures, After Immigration & Security",
      "accessType": "International",
      "timings": "24 Hours",
      "amenities": [
        "Full Service Bar",
        "Luxury Showers",
        "Sleeping Pods",
        "Global Cuisine Buffet",
        "Business Center"
      ],
      "networksAccepted": [
        "Priority Pass",
        "DreamFolks",
        "LoungeKey",
        "Diners Club",
        "Select Super-Premium Cards"
      ]
    },
    {
      "id": "bom-adani-t2-dom",
      "type": "airport",
      "city": "Mumbai",
      "airportOrStation": "Chhatrapati Shivaji Maharaj International Airport (BOM)",
      "terminal": "Terminal 2 (Domestic)",
      "name": "Adani Lounge (Domestic)",
      "operator": "Adani Airports / TFS",
      "locationDirections": "Level 3, Domestic Departures, After Security, Near Gate 44",
      "accessType": "Domestic",
      "timings": "24 Hours",
      "amenities": [
        "Gourmet Dining Spread",
        "Live Cooking Station",
        "Premium Bar",
        "High-Speed Wi-Fi",
        "Quiet Rest Zone"
      ],
      "networksAccepted": [
        "Visa",
        "Mastercard",
        "RuPay",
        "Diners Club",
        "Priority Pass",
        "DreamFolks"
      ]
    },
    {
      "id": "bom-travel-club-t1c",
      "type": "airport",
      "city": "Mumbai",
      "airportOrStation": "Chhatrapati Shivaji Maharaj International Airport (BOM)",
      "terminal": "Terminal 1C (Domestic)",
      "name": "Travel Club Lounge",
      "operator": "Travel Food Services",
      "locationDirections": "Level 1, Opposite Gate 1, After Security",
      "accessType": "Domestic",
      "timings": "24 Hours",
      "amenities": [
        "Hot Meals & Snacks",
        "Coffee & Tea Bar",
        "Wi-Fi",
        "Charging Points",
        "Flight Displays"
      ],
      "networksAccepted": [
        "Visa",
        "Mastercard",
        "RuPay",
        "DreamFolks"
      ]
    },
    {
      "id": "bom-oasis-t1b",
      "type": "airport",
      "city": "Mumbai",
      "airportOrStation": "Chhatrapati Shivaji Maharaj International Airport (BOM)",
      "terminal": "Terminal 1B (Domestic)",
      "name": "Oasis Lounge",
      "operator": "Travel Food Services",
      "locationDirections": "Ground Floor, Near Security Checkpoint, Domestic Departures",
      "accessType": "Domestic",
      "timings": "04:00 - 23:30",
      "amenities": [
        "Buffet Dining",
        "Beverage Station",
        "High Speed Internet",
        "Comfortable Seating"
      ],
      "networksAccepted": [
        "Visa",
        "Mastercard",
        "RuPay",
        "Priority Pass"
      ]
    },
    {
      "id": "bom-adani-t2-intl",
      "type": "airport",
      "city": "Mumbai",
      "airportOrStation": "Chhatrapati Shivaji Maharaj International Airport (BOM)",
      "terminal": "Terminal 2 (International)",
      "name": "Adani Lounge (International)",
      "operator": "Adani Airports",
      "locationDirections": "Level 4, International Departures, After Immigration and Duty Free",
      "accessType": "International",
      "timings": "24 Hours",
      "amenities": [
        "Luxury Buffet & À La Carte",
        "Fine Spirits Bar",
        "Private Cabanas",
        "Spa & Showers",
        "Wi-Fi"
      ],
      "networksAccepted": [
        "Priority Pass",
        "DreamFolks",
        "Select Infinite & Super-Premium Cards"
      ]
    },
    {
      "id": "blr-080-t1-dom",
      "type": "airport",
      "city": "Bengaluru",
      "airportOrStation": "Kempegowda International Airport (BLR)",
      "terminal": "Terminal 1 (Domestic)",
      "name": "080 Domestic Lounge",
      "operator": "Travel Food Services / BIAL",
      "locationDirections": "Mezzanine Level, Above Gate 13, Domestic Departures",
      "accessType": "Domestic",
      "timings": "24 Hours",
      "amenities": [
        "Artisan Coffee Bar",
        "Microbrewery Beer Tap",
        "South Indian Gourmet Spread",
        "Shower Suites",
        "Library Lounge"
      ],
      "networksAccepted": [
        "Visa",
        "Mastercard",
        "RuPay",
        "Diners Club",
        "Priority Pass",
        "DreamFolks"
      ]
    },
    {
      "id": "blr-080-t2-dom",
      "type": "airport",
      "city": "Bengaluru",
      "airportOrStation": "Kempegowda International Airport (BLR)",
      "terminal": "Terminal 2 (Domestic)",
      "name": "080 Terminal in a Garden Lounge",
      "operator": "Travel Food Services / BIAL",
      "locationDirections": "Level 4, Domestic Departures, Next to Gate D1",
      "accessType": "Domestic",
      "timings": "24 Hours",
      "amenities": [
        "Garden-Facing Balcony",
        "Curated Plant-Based & Continental Buffet",
        "Craft Cocktail Bar",
        "Nap Zones",
        "Ultra-Fast Wi-Fi"
      ],
      "networksAccepted": [
        "Visa",
        "Mastercard",
        "RuPay",
        "Diners Club",
        "Priority Pass",
        "DreamFolks"
      ]
    },
    {
      "id": "blr-080-t2-intl",
      "type": "airport",
      "city": "Bengaluru",
      "airportOrStation": "Kempegowda International Airport (BLR)",
      "terminal": "Terminal 2 (International)",
      "name": "080 International Lounge",
      "operator": "Travel Food Services / BIAL",
      "locationDirections": "Level 4, International Departures, After Security and Duty Free",
      "accessType": "International",
      "timings": "24 Hours",
      "amenities": [
        "Panoramic Runway Views",
        "International Master Buffet",
        "Full Cocktail Lounge",
        "Luxury Showers",
        "VIP Cabanas"
      ],
      "networksAccepted": [
        "Priority Pass",
        "DreamFolks",
        "Diners Club",
        "Select Ultra-Premium Cards"
      ]
    },
    {
      "id": "hyd-encalm-t1-dom",
      "type": "airport",
      "city": "Hyderabad",
      "airportOrStation": "Rajiv Gandhi International Airport (HYD)",
      "terminal": "Terminal 1 (Domestic)",
      "name": "Encalm Lounge (Domestic)",
      "operator": "Encalm Hospitality",
      "locationDirections": "Domestic Departures, Near Gate 21, After Security",
      "accessType": "Domestic",
      "timings": "24 Hours",
      "amenities": [
        "Hyderabadi Biryani Live Counter",
        "Cocktail Bar",
        "Wi-Fi",
        "Spacious Seating",
        "Flight Updates"
      ],
      "networksAccepted": [
        "Visa",
        "Mastercard",
        "RuPay",
        "Diners Club",
        "Priority Pass",
        "DreamFolks"
      ]
    },
    {
      "id": "hyd-encalm-intl",
      "type": "airport",
      "city": "Hyderabad",
      "airportOrStation": "Rajiv Gandhi International Airport (HYD)",
      "terminal": "Terminal 1 (International)",
      "name": "Encalm Lounge (International)",
      "operator": "Encalm Hospitality",
      "locationDirections": "International Departures, Level E, After Immigration",
      "accessType": "International",
      "timings": "24 Hours",
      "amenities": [
        "Hot International Buffet",
        "Bar Station",
        "Shower Cabins",
        "Rest Zone",
        "Fast Internet"
      ],
      "networksAccepted": [
        "Priority Pass",
        "DreamFolks",
        "Diners Club",
        "Selected Bank Cards"
      ]
    },
    {
      "id": "maa-travel-club-t1-a",
      "type": "airport",
      "city": "Chennai",
      "airportOrStation": "Chennai International Airport (MAA)",
      "terminal": "Terminal 1 (Domestic)",
      "name": "Travel Club Lounge A",
      "operator": "Travel Food Services",
      "locationDirections": "Domestic Departures, 1st Floor, Near Gate 5",
      "accessType": "Domestic",
      "timings": "24 Hours",
      "amenities": [
        "South Indian Delicacies",
        "Filter Coffee Station",
        "Wi-Fi",
        "Comfortable Loungers",
        "Beverages"
      ],
      "networksAccepted": [
        "Visa",
        "Mastercard",
        "RuPay",
        "Priority Pass",
        "DreamFolks"
      ]
    },
    {
      "id": "maa-travel-club-t1-b",
      "type": "airport",
      "city": "Chennai",
      "airportOrStation": "Chennai International Airport (MAA)",
      "terminal": "Terminal 1 (Domestic)",
      "name": "Travel Club Lounge B",
      "operator": "Travel Food Services",
      "locationDirections": "Domestic Departures, 1st Floor, Near Gate 1",
      "accessType": "Domestic",
      "timings": "04:00 - 23:00",
      "amenities": [
        "Hot Buffet",
        "Soft Drinks & Juices",
        "Wi-Fi",
        "Charging Ports"
      ],
      "networksAccepted": [
        "Visa",
        "Mastercard",
        "RuPay",
        "Priority Pass",
        "DreamFolks"
      ]
    },
    {
      "id": "ccu-travel-club-t1-dom",
      "type": "airport",
      "city": "Kolkata",
      "airportOrStation": "Netaji Subhash Chandra Bose International Airport (CCU)",
      "terminal": "Terminal 1 (Domestic)",
      "name": "Travel Club Lounge",
      "operator": "Travel Food Services",
      "locationDirections": "Domestic Departures, Mezzanine Floor, Above Gate 14",
      "accessType": "Domestic",
      "timings": "24 Hours",
      "amenities": [
        "Bengali Sweets & Snacks",
        "Hot Lunch/Dinner Buffet",
        "Wi-Fi",
        "Rest Chairs",
        "Beverage Counter"
      ],
      "networksAccepted": [
        "Visa",
        "Mastercard",
        "RuPay",
        "Diners Club",
        "Priority Pass",
        "DreamFolks"
      ]
    },
    {
      "id": "amd-the-lounge-t1",
      "type": "airport",
      "city": "Ahmedabad",
      "airportOrStation": "Sardar Vallabhbhai Patel International Airport (AMD)",
      "terminal": "Terminal 1 (Domestic)",
      "name": "The Lounge",
      "operator": "Adani Airports / TFS",
      "locationDirections": "1st Floor, Near Boarding Gate 1, After Security",
      "accessType": "Domestic",
      "timings": "24 Hours",
      "amenities": [
        "Gujarati Snacks & Buffet",
        "Chai Bar",
        "Wi-Fi",
        "Recliners",
        "TV Displays"
      ],
      "networksAccepted": [
        "Visa",
        "Mastercard",
        "RuPay",
        "Diners Club",
        "Priority Pass",
        "DreamFolks"
      ]
    },
    {
      "id": "amd-adani-silver-t2-intl",
      "type": "airport",
      "city": "Ahmedabad",
      "airportOrStation": "Sardar Vallabhbhai Patel International Airport (AMD)",
      "terminal": "Terminal 2 (International)",
      "name": "Adani Silver Lounge",
      "operator": "Adani Airports",
      "locationDirections": "International Departures, 1st Floor, Near Gate 8",
      "accessType": "International",
      "timings": "24 Hours",
      "amenities": [
        "Gourmet International Buffet",
        "Wi-Fi",
        "Luxury Seating",
        "Flight Updates"
      ],
      "networksAccepted": [
        "Priority Pass",
        "DreamFolks",
        "Select Premium Cards"
      ]
    },
    {
      "id": "goa-dabolim-good-times",
      "type": "airport",
      "city": "Goa",
      "airportOrStation": "Dabolim Airport (GOI)",
      "terminal": "Terminal 1 (Domestic)",
      "name": "Good Times Lounge & Bar",
      "operator": "Good Times",
      "locationDirections": "Domestic Departures, 1st Floor, After Security Hold Area",
      "accessType": "Domestic",
      "timings": "05:00 - 23:00",
      "amenities": [
        "Goan Snacks & Continental Buffet",
        "Bar Counter",
        "Wi-Fi",
        "Rest Area"
      ],
      "networksAccepted": [
        "Visa",
        "Mastercard",
        "RuPay",
        "Priority Pass",
        "DreamFolks"
      ]
    },
    {
      "id": "goa-mopa-encalm",
      "type": "airport",
      "city": "Goa",
      "airportOrStation": "Manohar International Airport, Mopa (GOX)",
      "terminal": "Domestic & International Main Concourse",
      "name": "Encalm Lounge (Mopa)",
      "operator": "Encalm Hospitality",
      "locationDirections": "1st Floor, After Security Check, Near Gate 4",
      "accessType": "Domestic & International",
      "timings": "24 Hours",
      "amenities": [
        "Cocktail & Mocktail Bar",
        "Coastal Seafood & Veg Buffet",
        "Scenic Runway Views",
        "High Speed Wi-Fi"
      ],
      "networksAccepted": [
        "Visa",
        "Mastercard",
        "RuPay",
        "Priority Pass",
        "DreamFolks"
      ]
    },
    {
      "id": "pnq-bird-lounge",
      "type": "airport",
      "city": "Pune",
      "airportOrStation": "Pune International Airport (PNQ)",
      "terminal": "Terminal 2 (New Terminal)",
      "name": "Bird Lounge",
      "operator": "Bird Group",
      "locationDirections": "1st Floor, Domestic Departures, After Security Check",
      "accessType": "Domestic",
      "timings": "24 Hours",
      "amenities": [
        "Hot Buffet Lunch & Dinner",
        "Tea & Coffee Bar",
        "Fast Wi-Fi",
        "Work Desks"
      ],
      "networksAccepted": [
        "Visa",
        "Mastercard",
        "RuPay",
        "Diners Club",
        "Priority Pass",
        "DreamFolks"
      ]
    },
    {
      "id": "jai-primus-t2",
      "type": "airport",
      "city": "Jaipur",
      "airportOrStation": "Jaipur International Airport (JAI)",
      "terminal": "Terminal 2 (Domestic)",
      "name": "Primus Lounge",
      "operator": "Primus Hospitality",
      "locationDirections": "1st Floor, Near Gate 3, After Security Hold Area",
      "accessType": "Domestic",
      "timings": "05:00 - 23:00",
      "amenities": [
        "Rajasthani Specialties & North Indian Buffet",
        "Wi-Fi",
        "Coffee & Beverage Bar",
        "Comfortable Sofas"
      ],
      "networksAccepted": [
        "Visa",
        "Mastercard",
        "RuPay",
        "Diners Club",
        "Priority Pass",
        "DreamFolks"
      ]
    },
    {
      "id": "cok-earth-lounge-t1",
      "type": "airport",
      "city": "Kochi",
      "airportOrStation": "Cochin International Airport (COK)",
      "terminal": "Terminal 1 (Domestic)",
      "name": "Earth Lounge",
      "operator": "Casino Group",
      "locationDirections": "Domestic Departures, 2nd Floor, After Security",
      "accessType": "Domestic",
      "timings": "24 Hours",
      "amenities": [
        "Kerala Traditional Cuisine & Multi-Cuisine Buffet",
        "Wi-Fi",
        "Shower Facilities",
        "Tea/Coffee"
      ],
      "networksAccepted": [
        "Visa",
        "Mastercard",
        "RuPay",
        "Priority Pass",
        "DreamFolks"
      ]
    },
    {
      "id": "lko-encalm-t3",
      "type": "airport",
      "city": "Lucknow",
      "airportOrStation": "Chaudhary Charan Singh International Airport (LKO)",
      "terminal": "Terminal 3 (Domestic)",
      "name": "Encalm Lounge",
      "operator": "Encalm Hospitality",
      "locationDirections": "1st Floor, Domestic Departures, Near Gate 5",
      "accessType": "Domestic",
      "timings": "24 Hours",
      "amenities": [
        "Awadhi Cuisine Buffet",
        "Beverage Bar",
        "Wi-Fi",
        "Recliners",
        "Flight Status Monitors"
      ],
      "networksAccepted": [
        "Visa",
        "Mastercard",
        "RuPay",
        "Priority Pass",
        "DreamFolks"
      ]
    },
    {
      "id": "ixc-cram-bar-t1",
      "type": "airport",
      "city": "Chandigarh",
      "airportOrStation": "Shaheed Bhagat Singh International Airport (IXC)",
      "terminal": "Main Terminal",
      "name": "The Cram Bar Lounge",
      "operator": "The Cram Bar",
      "locationDirections": "1st Floor, Security Hold Area, Near Gate 4",
      "accessType": "Domestic",
      "timings": "05:00 - 22:30",
      "amenities": [
        "Punjabi Delicacies",
        "Bar Beverages",
        "Wi-Fi",
        "Work Stations"
      ],
      "networksAccepted": [
        "Visa",
        "Mastercard",
        "RuPay",
        "Priority Pass",
        "DreamFolks"
      ]
    },
    {
      "id": "atq-primus-t1",
      "type": "airport",
      "city": "Amritsar",
      "airportOrStation": "Sri Guru Ram Dass Jee International Airport (ATQ)",
      "terminal": "Terminal 1",
      "name": "Primus Lounge",
      "operator": "Primus Hospitality",
      "locationDirections": "1st Floor, After Security Hold Area",
      "accessType": "Domestic & International",
      "timings": "24 Hours",
      "amenities": [
        "Hot Buffet Meals",
        "Beverages",
        "Wi-Fi",
        "Comfortable Loungers"
      ],
      "networksAccepted": [
        "Visa",
        "Mastercard",
        "RuPay",
        "Priority Pass",
        "DreamFolks"
      ]
    },
    {
      "id": "sxr-paahun-t1",
      "type": "airport",
      "city": "Srinagar",
      "airportOrStation": "Sheikh ul-Alam International Airport (SXR)",
      "terminal": "Domestic Terminal",
      "name": "Paahun Executive Lounge",
      "operator": "JKTDC",
      "locationDirections": "1st Floor, Security Hold Area, Near Gate 2",
      "accessType": "Domestic",
      "timings": "06:00 - 20:00",
      "amenities": [
        "Kashmiri Kahwa Counter",
        "Warm Buffet Meals",
        "Wi-Fi",
        "Heated Seating"
      ],
      "networksAccepted": [
        "Visa",
        "Mastercard",
        "RuPay",
        "Priority Pass"
      ]
    },
    {
      "id": "bbi-bird-t1",
      "type": "airport",
      "city": "Bhubaneswar",
      "airportOrStation": "Biju Patnaik International Airport (BBI)",
      "terminal": "Terminal 1 (Domestic)",
      "name": "Bird Lounge",
      "operator": "Bird Group",
      "locationDirections": "1st Floor, Domestic Departures, Near Gate 2",
      "accessType": "Domestic",
      "timings": "24 Hours",
      "amenities": [
        "Multi-Cuisine Buffet",
        "Wi-Fi",
        "Beverages",
        "Flight Monitors"
      ],
      "networksAccepted": [
        "Visa",
        "Mastercard",
        "RuPay",
        "Priority Pass",
        "DreamFolks"
      ]
    },
    {
      "id": "idr-primus-t1",
      "type": "airport",
      "city": "Indore",
      "airportOrStation": "Devi Ahilyabai Holkar Airport (IDR)",
      "terminal": "Terminal 1",
      "name": "Primus Lounge",
      "operator": "Primus Hospitality",
      "locationDirections": "1st Floor, Near Gate 3, After Security",
      "accessType": "Domestic",
      "timings": "05:00 - 23:00",
      "amenities": [
        "Indori Poha & Snacks",
        "Hot Buffet",
        "Wi-Fi",
        "Beverage Station"
      ],
      "networksAccepted": [
        "Visa",
        "Mastercard",
        "RuPay",
        "Priority Pass",
        "DreamFolks"
      ]
    },
    {
      "id": "ded-bird-t1",
      "type": "airport",
      "city": "Dehradun",
      "airportOrStation": "Jolly Grant Airport (DED)",
      "terminal": "Domestic Terminal",
      "name": "Bird Lounge",
      "operator": "Bird Group",
      "locationDirections": "1st Floor, After Security Hold Area",
      "accessType": "Domestic",
      "timings": "06:00 - 21:00",
      "amenities": [
        "Snacks & Beverages",
        "Wi-Fi",
        "Relaxation Chairs"
      ],
      "networksAccepted": [
        "Visa",
        "Mastercard",
        "RuPay",
        "Priority Pass",
        "DreamFolks"
      ]
    },
    {
      "id": "vns-takeoff-t1",
      "type": "airport",
      "city": "Varanasi",
      "airportOrStation": "Lal Bahadur Shastri International Airport (VNS)",
      "terminal": "Terminal 1",
      "name": "Take Off Bar & Lounge",
      "operator": "Take Off Hospitality",
      "locationDirections": "Ground Floor, Security Hold Area, Near Gate 2",
      "accessType": "Domestic",
      "timings": "06:00 - 22:00",
      "amenities": [
        "Buffet Dining",
        "Chai Bar",
        "Wi-Fi",
        "Charging Ports"
      ],
      "networksAccepted": [
        "Visa",
        "Mastercard",
        "RuPay",
        "Priority Pass",
        "DreamFolks"
      ]
    },
    {
      "id": "pat-zesto-t1",
      "type": "airport",
      "city": "Patna",
      "airportOrStation": "Jay Prakash Narayan Airport (PAT)",
      "terminal": "Domestic Terminal",
      "name": "Zesto Lounge",
      "operator": "Zesto Hospitality",
      "locationDirections": "1st Floor, After Security Hold Area",
      "accessType": "Domestic",
      "timings": "05:30 - 22:30",
      "amenities": [
        "Hot Meals",
        "Beverages",
        "Wi-Fi",
        "Comfortable Seating"
      ],
      "networksAccepted": [
        "Visa",
        "Mastercard",
        "RuPay",
        "Priority Pass",
        "DreamFolks"
      ]
    },
    {
      "id": "rpr-primus-t1",
      "type": "airport",
      "city": "Raipur",
      "airportOrStation": "Swami Vivekananda Airport (RPR)",
      "terminal": "Domestic Terminal",
      "name": "Primus Lounge",
      "operator": "Primus Hospitality",
      "locationDirections": "1st Floor, Security Hold Area, Opposite Gate 2",
      "accessType": "Domestic",
      "timings": "06:00 - 22:00",
      "amenities": [
        "Buffet Food",
        "Beverages",
        "Wi-Fi",
        "Recliners"
      ],
      "networksAccepted": [
        "Visa",
        "Mastercard",
        "RuPay",
        "Priority Pass",
        "DreamFolks"
      ]
    },
    {
      "id": "ayj-casual-t1",
      "type": "airport",
      "city": "Ayodhya",
      "airportOrStation": "Maharishi Valmiki International Airport (AYJ)",
      "terminal": "Main Terminal",
      "name": "Ayodhya Premium Dining Lounge",
      "operator": "Airport Concessionaire",
      "locationDirections": "After Security Check Area, Ground Floor",
      "accessType": "Domestic",
      "timings": "07:00 - 21:00",
      "amenities": [
        "Pure Vegetarian Buffet",
        "Herbal Tea & Beverages",
        "Wi-Fi",
        "Rest Zone"
      ],
      "networksAccepted": [
        "Visa",
        "Mastercard",
        "RuPay"
      ]
    },
    {
      "id": "rail-delhi-ndls-p1",
      "type": "railway",
      "city": "New Delhi",
      "airportOrStation": "New Delhi Railway Station (NDLS)",
      "terminal": "Platform No. 1 (Paharganj Side Concourse)",
      "name": "IRCTC Executive Railway Lounge (PF 1)",
      "operator": "IRCTC & Travel Food Services",
      "locationDirections": "Adjacent to VIP Entry Gate, Platform 1 Paharganj Concourse",
      "accessType": "Railway Executive Lounge",
      "timings": "24 Hours",
      "amenities": [
        "Complimentary Multi-Cuisine Buffet",
        "High-Speed Wi-Fi",
        "Shower & Bath Cubicles",
        "Massaging Recliners",
        "Baggage Storage Lockers",
        "Charging Stations",
        "Train Display Monitors"
      ],
      "networksAccepted": [
        "Visa",
        "Mastercard",
        "RuPay",
        "Selected Railway Credit Cards"
      ]
    },
    {
      "id": "rail-delhi-ndls-p16",
      "type": "railway",
      "city": "New Delhi",
      "airportOrStation": "New Delhi Railway Station (NDLS)",
      "terminal": "Platform No. 16 (Ajmeri Gate Side, 1st Floor)",
      "name": "IRCTC Executive Railway Lounge (PF 16)",
      "operator": "IRCTC",
      "locationDirections": "1st Floor, Above Passenger Waiting Hall, Ajmeri Gate Side",
      "accessType": "Railway Executive Lounge",
      "timings": "24 Hours",
      "amenities": [
        "Air-Conditioned Dining",
        "Hot Buffet Breakfast/Lunch/Dinner",
        "Wi-Fi",
        "Luxury Sofa Seating",
        "Shower Facilities"
      ],
      "networksAccepted": [
        "Visa",
        "Mastercard",
        "RuPay",
        "ICICI Coral/Rubyx/Sapphiro",
        "SBI Prime/Elite"
      ]
    },
    {
      "id": "rail-delhi-anvt",
      "type": "railway",
      "city": "New Delhi",
      "airportOrStation": "Anand Vihar Terminal (ANVT)",
      "terminal": "Platform No. 1 Concourse",
      "name": "IRCTC Executive Lounge Anand Vihar",
      "operator": "IRCTC",
      "locationDirections": "Near Main Waiting Hall, Platform No. 1",
      "accessType": "Railway Executive Lounge",
      "timings": "24 Hours",
      "amenities": [
        "Buffet Meals & Snacks",
        "Hot Beverages",
        "Clean Showers",
        "Free Wi-Fi",
        "Mobile Charging"
      ],
      "networksAccepted": [
        "Visa",
        "Mastercard",
        "RuPay",
        "Selected Credit Cards"
      ]
    },
    {
      "id": "rail-kolkata-sealdah",
      "type": "railway",
      "city": "Kolkata",
      "airportOrStation": "Sealdah Railway Station (SDAH)",
      "terminal": "Main Concourse Near Platform 14",
      "name": "IRCTC Executive Railway Lounge Sealdah",
      "operator": "IRCTC",
      "locationDirections": "Near Platform 14, Main Booking Hall Area",
      "accessType": "Railway Executive Lounge",
      "timings": "24 Hours",
      "amenities": [
        "Gourmet Meals",
        "High Speed Wi-Fi",
        "Shower Suites",
        "Reclining Chairs",
        "Luggage Assistance"
      ],
      "networksAccepted": [
        "Visa",
        "Mastercard",
        "RuPay",
        "ICICI/SBI Railway Cards"
      ]
    },
    {
      "id": "rail-varanasi-cantt",
      "type": "railway",
      "city": "Varanasi",
      "airportOrStation": "Varanasi Junction (BSB)",
      "terminal": "Platform No. 1 (Cantt Side)",
      "name": "IRCTC Executive Lounge Varanasi",
      "operator": "IRCTC",
      "locationDirections": "Near Main Entrance, Platform No. 1",
      "accessType": "Railway Executive Lounge",
      "timings": "24 Hours",
      "amenities": [
        "Pure Vegetarian Buffet",
        "Tea & Coffee",
        "Wi-Fi",
        "Air Conditioned Lounge",
        "Washrooms"
      ],
      "networksAccepted": [
        "Visa",
        "Mastercard",
        "RuPay",
        "ICICI",
        "SBI"
      ]
    },
    {
      "id": "rail-agra-cantt",
      "type": "railway",
      "city": "Agra",
      "airportOrStation": "Agra Cantt Railway Station (AGC)",
      "terminal": "Platform No. 1",
      "name": "IRCTC Executive Lounge Agra Cantt",
      "operator": "IRCTC",
      "locationDirections": "Platform No. 1, Near 1st Class Waiting Hall",
      "accessType": "Railway Executive Lounge",
      "timings": "24 Hours",
      "amenities": [
        "Multi-Cuisine Buffet",
        "Wi-Fi",
        "Recliners",
        "Baggage Storage",
        "Beverages"
      ],
      "networksAccepted": [
        "Visa",
        "Mastercard",
        "RuPay",
        "Credit Cards with Railway Benefits"
      ]
    },
    {
      "id": "rail-jaipur-jn",
      "type": "railway",
      "city": "Jaipur",
      "airportOrStation": "Jaipur Junction (JP)",
      "terminal": "Platform No. 1",
      "name": "IRCTC Executive Lounge Jaipur",
      "operator": "IRCTC",
      "locationDirections": "1st Floor, Near Main Portico, Platform 1",
      "accessType": "Railway Executive Lounge",
      "timings": "24 Hours",
      "amenities": [
        "Rajasthani Buffet",
        "Hot Beverages",
        "Clean Washrooms & Showers",
        "Free Wi-Fi",
        "Television"
      ],
      "networksAccepted": [
        "Visa",
        "Mastercard",
        "RuPay",
        "Selected Credit Cards"
      ]
    },
    {
      "id": "rail-ahmedabad-kalupur",
      "type": "railway",
      "city": "Ahmedabad",
      "airportOrStation": "Ahmedabad Junction (ADI)",
      "terminal": "Platform No. 1 (Kalupur Concourse)",
      "name": "IRCTC Executive Lounge Ahmedabad",
      "operator": "IRCTC",
      "locationDirections": "Platform No. 1, Adjacent to Escalators, Kalupur Entry",
      "accessType": "Railway Executive Lounge",
      "timings": "24 Hours",
      "amenities": [
        "Vegetarian Buffet Spread",
        "Beverages",
        "Wi-Fi",
        "Shower Cabins",
        "Rest Zone"
      ],
      "networksAccepted": [
        "Visa",
        "Mastercard",
        "RuPay",
        "ICICI",
        "SBI"
      ]
    },
    {
      "id": "rail-madurai-jn",
      "type": "railway",
      "city": "Madurai",
      "airportOrStation": "Madurai Junction (MDU)",
      "terminal": "Platform No. 1",
      "name": "IRCTC Executive Lounge Madurai",
      "operator": "IRCTC",
      "locationDirections": "Platform No. 1, Near Main Concourse",
      "accessType": "Railway Executive Lounge",
      "timings": "24 Hours",
      "amenities": [
        "South Indian Buffet & Tiffin",
        "Wi-Fi",
        "Air Conditioned Resting Sofas",
        "Shower Facilities"
      ],
      "networksAccepted": [
        "Visa",
        "Mastercard",
        "RuPay",
        "Selected Cards"
      ]
    }
  ],
  "cards": [
    {
      "id": "icici-emeralde-private",
      "name": "ICICI Bank Emeralde Private Metal Credit Card",
      "bank": "ICICI Bank",
      "network": "Mastercard / Visa / Amex",
      "cardType": "credit",
      "tier": "Super Premium",
      "domesticAirportQuota": "Unlimited",
      "internationalAirportQuota": "Unlimited via Priority Pass",
      "railwayLoungeQuota": "Unlimited",
      "spendRequirement": "Zero minimum spend condition — Unconditional Unlimited Lounge Access for Primary and Add-on Cardholders",
      "spendThresholdAmount": 0,
      "guestAccess": "Unlimited complimentary guest access (up to 2 guests per visit)",
      "loungeAccessProgram": "ICICI Consolidated Lounge Network & Priority Pass",
      "authFee": "₹2 (Refundable) on Visa/Mastercard, ₹25 on Amex",
      "eligibleLoungesType": "all-domestic-and-intl"
    },
    {
      "id": "icici-emeralde",
      "name": "ICICI Bank Emeralde Credit Card",
      "bank": "ICICI Bank",
      "network": "Mastercard / Visa / Amex",
      "cardType": "credit",
      "tier": "Premium",
      "domesticAirportQuota": "Unlimited",
      "internationalAirportQuota": "Unlimited via Priority Pass",
      "railwayLoungeQuota": "Unlimited",
      "spendRequirement": "Zero minimum spend condition — Unconditional Unlimited Access",
      "spendThresholdAmount": 0,
      "guestAccess": "Chargeable at walk-in rate",
      "loungeAccessProgram": "ICICI Consolidated Lounge Network",
      "authFee": "₹2 (Refundable)",
      "eligibleLoungesType": "all-domestic"
    },
    {
      "id": "icici-sapphiro",
      "name": "ICICI Bank Sapphiro Credit Card (Dual Card Variant)",
      "bank": "ICICI Bank",
      "network": "Visa + Mastercard / RuPay",
      "cardType": "credit",
      "tier": "Premium",
      "domesticAirportQuota": "4 visits per quarter (2 per card variant)",
      "internationalAirportQuota": "2 visits per year via DreamFolks",
      "railwayLoungeQuota": "4 visits per quarter (2 per card variant)",
      "spendRequirement": "₹10,000 spend in the preceding calendar quarter on retail purchases to unlock access for the next quarter",
      "spendThresholdAmount": 10000,
      "guestAccess": "Chargeable at standard entry fees",
      "loungeAccessProgram": "ICICI Consolidated Domestic Lounge Network",
      "authFee": "₹2 (Refundable)",
      "eligibleLoungesType": "all-domestic"
    },
    {
      "id": "icici-rubyx",
      "name": "ICICI Bank Rubyx Credit Card",
      "bank": "ICICI Bank",
      "network": "Mastercard / Visa / RuPay",
      "cardType": "credit",
      "tier": "Mid-Tier",
      "domesticAirportQuota": "2 visits per quarter (1 per card variant)",
      "internationalAirportQuota": "None",
      "railwayLoungeQuota": "2 visits per quarter (1 per card variant)",
      "spendRequirement": "₹10,000 spend in the preceding calendar quarter on retail purchases",
      "spendThresholdAmount": 10000,
      "guestAccess": "Chargeable",
      "loungeAccessProgram": "ICICI Consolidated Domestic Lounge Network",
      "authFee": "₹2 (Refundable)",
      "eligibleLoungesType": "all-domestic"
    },
    {
      "id": "icici-coral",
      "name": "ICICI Bank Coral Credit Card",
      "bank": "ICICI Bank",
      "network": "Visa / Mastercard / RuPay",
      "cardType": "credit",
      "tier": "Entry-Level",
      "domesticAirportQuota": "1 visit per quarter",
      "internationalAirportQuota": "None",
      "railwayLoungeQuota": "1 visit per quarter",
      "spendRequirement": "₹10,000 spend in the preceding calendar quarter on retail purchases",
      "spendThresholdAmount": 10000,
      "guestAccess": "Chargeable",
      "loungeAccessProgram": "ICICI Consolidated Domestic Lounge Network",
      "authFee": "₹2 (Refundable)",
      "eligibleLoungesType": "all-domestic"
    },
    {
      "id": "amazon-pay-icici",
      "name": "Amazon Pay ICICI Bank Credit Card",
      "bank": "ICICI Bank",
      "network": "Visa",
      "cardType": "credit",
      "tier": "Co-Branded Cashback",
      "domesticAirportQuota": "None (Lounge access is not offered on Amazon Pay ICICI)",
      "internationalAirportQuota": "None",
      "railwayLoungeQuota": "None",
      "spendRequirement": "No lounge benefit attached to this card; designed purely for 5% uncapped e-commerce cashback",
      "spendThresholdAmount": 0,
      "guestAccess": "N/A",
      "loungeAccessProgram": "None",
      "authFee": "N/A",
      "eligibleLoungesType": "none"
    },
    {
      "id": "axis-burgundy-private",
      "name": "Axis Bank Burgundy Private Credit Card",
      "bank": "Axis Bank",
      "network": "Mastercard World Elite",
      "cardType": "credit",
      "tier": "Super Premium",
      "domesticAirportQuota": "Unlimited complimentary lounge access",
      "internationalAirportQuota": "Unlimited via Priority Pass",
      "railwayLoungeQuota": "N/A",
      "spendRequirement": "Zero spend condition — Unconditional unlimited access",
      "spendThresholdAmount": 0,
      "guestAccess": "Complimentary for up to 2 guests per visit",
      "loungeAccessProgram": "Axis Set B Extended Lounge Network",
      "authFee": "₹2 (Refundable)",
      "eligibleLoungesType": "axis-set-b"
    },
    {
      "id": "axis-magnus",
      "name": "Axis Bank Magnus Credit Card",
      "bank": "Axis Bank",
      "network": "Mastercard / Visa",
      "cardType": "credit",
      "tier": "Super Premium",
      "domesticAirportQuota": "Unlimited complimentary domestic airport lounge access",
      "internationalAirportQuota": "Unlimited via Priority Pass",
      "railwayLoungeQuota": "N/A",
      "spendRequirement": "Unconditional unlimited domestic lounge visits",
      "spendThresholdAmount": 0,
      "guestAccess": "4 complimentary guest visits per year",
      "loungeAccessProgram": "Axis Set B Extended Lounge Network",
      "authFee": "₹2 (Refundable)",
      "eligibleLoungesType": "axis-set-b"
    },
    {
      "id": "axis-atlas",
      "name": "Axis Bank Atlas Credit Card",
      "bank": "Axis Bank",
      "network": "Visa Signature / Mastercard",
      "cardType": "credit",
      "tier": "Travel Premium",
      "domesticAirportQuota": "Up to 18 visits per year (Silver: 8, Gold: 12, Platinum: 18)",
      "internationalAirportQuota": "Up to 12 visits per year via DreamFolks",
      "railwayLoungeQuota": "N/A",
      "spendRequirement": "Tier status determined by annual milestones: Silver (Entry), Gold (₹7.5L spend), Platinum (₹15L spend)",
      "spendThresholdAmount": 0,
      "guestAccess": "Deducted from complimentary visit balance",
      "loungeAccessProgram": "Axis Set B Extended Lounge Network",
      "authFee": "₹2 (Refundable)",
      "eligibleLoungesType": "axis-set-b"
    },
    {
      "id": "flipkart-axis",
      "name": "Flipkart Axis Bank Credit Card",
      "bank": "Axis Bank",
      "network": "Mastercard / Visa",
      "cardType": "credit",
      "tier": "Co-Branded Cashback",
      "domesticAirportQuota": "4 visits per calendar year",
      "internationalAirportQuota": "None",
      "railwayLoungeQuota": "None",
      "spendRequirement": "₹50,000 spend in previous 3 calendar months required to unlock airport lounge access",
      "spendThresholdAmount": 50000,
      "guestAccess": "Chargeable",
      "loungeAccessProgram": "Axis Set A Core Lounge Network (DEL, BOM, BLR, MAA, HYD, CCU)",
      "authFee": "₹2 (Refundable)",
      "eligibleLoungesType": "axis-set-a"
    },
    {
      "id": "axis-ace",
      "name": "Axis Bank ACE Credit Card",
      "bank": "Axis Bank",
      "network": "Visa Signature / Mastercard",
      "cardType": "credit",
      "tier": "Cashback",
      "domesticAirportQuota": "4 visits per calendar year",
      "internationalAirportQuota": "None",
      "railwayLoungeQuota": "None",
      "spendRequirement": "₹50,000 spend in previous 3 calendar months required to unlock lounge access",
      "spendThresholdAmount": 50000,
      "guestAccess": "Chargeable",
      "loungeAccessProgram": "Axis Set A Core Lounge Network",
      "authFee": "₹2 (Refundable)",
      "eligibleLoungesType": "axis-set-a"
    },
    {
      "id": "airtel-axis",
      "name": "Airtel Axis Bank Credit Card",
      "bank": "Axis Bank",
      "network": "Mastercard / Visa",
      "cardType": "credit",
      "tier": "Utility Cashback",
      "domesticAirportQuota": "4 visits per calendar year",
      "internationalAirportQuota": "None",
      "railwayLoungeQuota": "None",
      "spendRequirement": "₹50,000 spend in previous 3 calendar months required",
      "spendThresholdAmount": 50000,
      "guestAccess": "Chargeable",
      "loungeAccessProgram": "Axis Set A Core Lounge Network",
      "authFee": "₹2 (Refundable)",
      "eligibleLoungesType": "axis-set-a"
    },
    {
      "id": "axis-my-zone",
      "name": "Axis Bank MY Zone Credit Card",
      "bank": "Axis Bank",
      "network": "Mastercard / RuPay",
      "cardType": "credit",
      "tier": "Entry-Level",
      "domesticAirportQuota": "1 visit per calendar quarter",
      "internationalAirportQuota": "None",
      "railwayLoungeQuota": "None",
      "spendRequirement": "₹50,000 spend in previous 3 calendar months required",
      "spendThresholdAmount": 50000,
      "guestAccess": "Chargeable",
      "loungeAccessProgram": "Axis Set A Core Lounge Network",
      "authFee": "₹2 (Refundable)",
      "eligibleLoungesType": "axis-set-a"
    },
    {
      "id": "hdfc-infinia-metal",
      "name": "HDFC Bank Infinia Metal Edition",
      "bank": "HDFC Bank",
      "network": "Visa Infinite",
      "cardType": "credit",
      "tier": "Super Premium",
      "domesticAirportQuota": "Unlimited complimentary domestic airport lounge access",
      "internationalAirportQuota": "Unlimited international visits via Priority Pass for Primary & Add-on cardholders",
      "railwayLoungeQuota": "N/A",
      "spendRequirement": "Zero minimum spend condition — 100% Unconditional Access",
      "spendThresholdAmount": 0,
      "guestAccess": "Complimentary for authorized Add-on cardholders",
      "loungeAccessProgram": "Global Priority Pass & Visa Infinite Domestic Lounge Network",
      "authFee": "₹2 (Refundable)",
      "eligibleLoungesType": "all-domestic-and-intl"
    },
    {
      "id": "hdfc-diners-black",
      "name": "HDFC Diners Club Black Metal",
      "bank": "HDFC Bank",
      "network": "Diners Club",
      "cardType": "credit",
      "tier": "Super Premium",
      "domesticAirportQuota": "Unlimited complimentary airport lounge visits worldwide",
      "internationalAirportQuota": "Unlimited worldwide for Primary & Add-on cardholders",
      "railwayLoungeQuota": "N/A",
      "spendRequirement": "Zero minimum spend condition — 100% Unconditional Access",
      "spendThresholdAmount": 0,
      "guestAccess": "Complimentary for Add-on cardholders",
      "loungeAccessProgram": "Diners Club Global Lounge Network",
      "authFee": "₹2 (Refundable)",
      "eligibleLoungesType": "all-domestic-and-intl"
    },
    {
      "id": "hdfc-regalia-gold",
      "name": "HDFC Bank Regalia Gold Credit Card",
      "bank": "HDFC Bank",
      "network": "Visa Signature / Mastercard",
      "cardType": "credit",
      "tier": "Premium Travel",
      "domesticAirportQuota": "12 visits per calendar year (both domestic & international)",
      "internationalAirportQuota": "Up to 6 visits per year via Priority Pass",
      "railwayLoungeQuota": "N/A",
      "spendRequirement": "Spend ₹1,00,000 or more in a calendar quarter to receive 2 complimentary airport lounge vouchers",
      "spendThresholdAmount": 100000,
      "guestAccess": "Chargeable",
      "loungeAccessProgram": "HDFC Bank SmartBuy / Visa Domestic Lounge Network",
      "authFee": "₹2 (Refundable)",
      "eligibleLoungesType": "all-domestic"
    },
    {
      "id": "hdfc-millennia-debit",
      "name": "HDFC Millennia Debit Card",
      "bank": "HDFC Bank",
      "network": "Mastercard / Visa",
      "cardType": "debit",
      "tier": "High-Yield Debit",
      "domesticAirportQuota": "4 visits per year (1 visit per calendar quarter)",
      "internationalAirportQuota": "None",
      "railwayLoungeQuota": "None",
      "spendRequirement": "Spend ₹5,000 or more on your debit card in the preceding calendar quarter to unlock access",
      "spendThresholdAmount": 5000,
      "guestAccess": "Chargeable",
      "loungeAccessProgram": "Visa / Mastercard Domestic Debit Lounge Program",
      "authFee": "₹2 (Refundable)",
      "eligibleLoungesType": "all-domestic"
    },
    {
      "id": "sbi-card-elite",
      "name": "SBI Card ELITE",
      "bank": "SBI Card",
      "network": "Visa Signature / Mastercard",
      "cardType": "credit",
      "tier": "Premium",
      "domesticAirportQuota": "8 visits per year (max 2 per calendar quarter)",
      "internationalAirportQuota": "6 visits per year via Priority Pass (max 2 per quarter)",
      "railwayLoungeQuota": "8 visits per year (max 2 per calendar quarter)",
      "spendRequirement": "Unconditional quarterly entitlement (No retail spend hurdle required)",
      "spendThresholdAmount": 0,
      "guestAccess": "Chargeable at walk-in rates",
      "loungeAccessProgram": "SBI Card Domestic Lounge Network & Priority Pass",
      "authFee": "₹2 (Refundable)",
      "eligibleLoungesType": "all-domestic"
    },
    {
      "id": "sbi-card-prime",
      "name": "SBI Card PRIME",
      "bank": "SBI Card",
      "network": "Visa Signature / Mastercard",
      "cardType": "credit",
      "tier": "Mid-Premium",
      "domesticAirportQuota": "8 visits per year (max 2 per calendar quarter)",
      "internationalAirportQuota": "4 visits per year via Priority Pass (max 2 per quarter)",
      "railwayLoungeQuota": "4 visits per year (max 1 per calendar quarter)",
      "spendRequirement": "Unconditional quarterly entitlement",
      "spendThresholdAmount": 0,
      "guestAccess": "Chargeable",
      "loungeAccessProgram": "SBI Card Domestic & Railway Lounge Network",
      "authFee": "₹2 (Refundable)",
      "eligibleLoungesType": "all-domestic"
    },
    {
      "id": "phonepe-sbi-select-black",
      "name": "PhonePe SBI Card SELECT Black",
      "bank": "SBI Card",
      "network": "RuPay / Visa",
      "cardType": "credit",
      "tier": "Co-Branded Premium",
      "domesticAirportQuota": "8 visits per year (max 2 per calendar quarter)",
      "internationalAirportQuota": "None",
      "railwayLoungeQuota": "4 visits per year (max 1 per quarter)",
      "spendRequirement": "Unconditional quarterly access entitlement",
      "spendThresholdAmount": 0,
      "guestAccess": "Chargeable",
      "loungeAccessProgram": "SBI Card & RuPay Lounge Network",
      "authFee": "₹2 (Refundable)",
      "eligibleLoungesType": "all-domestic"
    },
    {
      "id": "sbi-cashback",
      "name": "SBI Cashback Credit Card",
      "bank": "SBI Card",
      "network": "Visa Signature",
      "cardType": "credit",
      "tier": "Cashback",
      "domesticAirportQuota": "None (Revoked in 2023 devaluation)",
      "internationalAirportQuota": "None",
      "railwayLoungeQuota": "None",
      "spendRequirement": "Lounge access discontinued by SBI Card to preserve flat 5% direct cashback on online shopping",
      "spendThresholdAmount": 0,
      "guestAccess": "N/A",
      "loungeAccessProgram": "None",
      "authFee": "N/A",
      "eligibleLoungesType": "none"
    },
    {
      "id": "irctc-sbi-premier",
      "name": "IRCTC SBI Card Premier",
      "bank": "SBI Card",
      "network": "RuPay / Visa",
      "cardType": "credit",
      "tier": "Co-Branded Railway",
      "domesticAirportQuota": "None",
      "internationalAirportQuota": "None",
      "railwayLoungeQuota": "4 complimentary railway executive lounge visits per year (max 1/quarter)",
      "spendRequirement": "Unconditional access to IRCTC Executive Lounges in NDLS, Sealdah, Varanasi, Agra, Jaipur, etc.",
      "spendThresholdAmount": 0,
      "guestAccess": "Chargeable at IRCTC rates",
      "loungeAccessProgram": "IRCTC Executive Lounges Network",
      "authFee": "₹2 (Refundable)",
      "eligibleLoungesType": "railway-only"
    },
    {
      "id": "idfc-first-wealth",
      "name": "IDFC FIRST Wealth Credit Card",
      "bank": "IDFC FIRST Bank",
      "network": "Visa Infinite",
      "cardType": "credit",
      "tier": "Premium",
      "domesticAirportQuota": "4 visits per quarter",
      "internationalAirportQuota": "4 visits per quarter via DreamFolks",
      "railwayLoungeQuota": "4 visits per quarter",
      "spendRequirement": "Spend ₹20,000 or more in the previous calendar month to unlock complimentary airport and railway lounge access",
      "spendThresholdAmount": 20000,
      "guestAccess": "Chargeable",
      "loungeAccessProgram": "Visa Infinite & DreamFolks Network",
      "authFee": "₹2 (Refundable)",
      "eligibleLoungesType": "all-domestic"
    },
    {
      "id": "idfc-first-select",
      "name": "IDFC FIRST Select Credit Card",
      "bank": "IDFC FIRST Bank",
      "network": "Visa Signature",
      "cardType": "credit",
      "tier": "Mid-Tier",
      "domesticAirportQuota": "2 visits per quarter",
      "internationalAirportQuota": "None",
      "railwayLoungeQuota": "4 visits per quarter",
      "spendRequirement": "Spend ₹20,000 or more in the previous calendar month to unlock access",
      "spendThresholdAmount": 20000,
      "guestAccess": "Chargeable",
      "loungeAccessProgram": "Visa Signature Domestic Lounge Program",
      "authFee": "₹2 (Refundable)",
      "eligibleLoungesType": "all-domestic"
    },
    {
      "id": "idfc-wealth-debit",
      "name": "IDFC FIRST Wealth Debit Card",
      "bank": "IDFC FIRST Bank",
      "network": "Visa Infinite",
      "cardType": "debit",
      "tier": "High-Yield Debit",
      "domesticAirportQuota": "2 visits per quarter",
      "internationalAirportQuota": "2 visits per quarter via LoungeKey",
      "railwayLoungeQuota": "2 visits per quarter",
      "spendRequirement": "Maintain Wealth tier Relationship Value (AMB of ₹10 Lakhs or ₹5 Lakhs 3-month net deposit)",
      "spendThresholdAmount": 0,
      "guestAccess": "Chargeable",
      "loungeAccessProgram": "Visa Infinite Domestic & Railway Lounge Network",
      "authFee": "₹2 (Refundable)",
      "eligibleLoungesType": "all-domestic"
    },
    {
      "id": "fi-federal-debit",
      "name": "Fi Federal Bank Salary / Infinite Debit Card",
      "bank": "Federal Bank / Fi",
      "network": "Visa Platinum / Infinite",
      "cardType": "debit",
      "tier": "Fintech Debit",
      "domesticAirportQuota": "1 visit per quarter (Infinite tier users)",
      "internationalAirportQuota": "None",
      "railwayLoungeQuota": "None",
      "spendRequirement": "Maintain Fi Infinite plan status or ₹50,000 monthly salary account credit",
      "spendThresholdAmount": 50000,
      "guestAccess": "Chargeable",
      "loungeAccessProgram": "Visa Domestic Lounge Program",
      "authFee": "₹2 (Refundable)",
      "eligibleLoungesType": "all-domestic"
    }
  ]
};

export const LOUNGES_LIST: LoungeLocation[] = LOUNGE_DATABASE.lounges;
export const LOUNGE_CARDS_LIST: LoungeCardEligibility[] = LOUNGE_DATABASE.cards;

/**
 * Match a user's query against cards in the database.
 */
export function searchLoungeCards(query: string): LoungeCardEligibility[] {
  const q = query.trim().toLowerCase();
  if (!q) return LOUNGE_CARDS_LIST;
  return LOUNGE_CARDS_LIST.filter(c => 
    c.name.toLowerCase().includes(q) ||
    c.bank.toLowerCase().includes(q) ||
    c.network.toLowerCase().includes(q) ||
    c.tier.toLowerCase().includes(q) ||
    c.id.toLowerCase().includes(q)
  );
}

/**
 * Check if a specific lounge is eligible for a given card.
 */
export function isLoungeEligibleForCard(lounge: LoungeLocation, card: LoungeCardEligibility): {
  eligible: boolean;
  accessQuota: string;
  notes?: string;
} {
  if (card.eligibleLoungesType === 'none') {
    return {
      eligible: false,
      accessQuota: 'None',
      notes: 'This card does not offer airport or railway lounge access.'
    };
  }

  if (lounge.type === 'railway') {
    if (card.railwayLoungeQuota && card.railwayLoungeQuota !== 'None' && card.railwayLoungeQuota !== 'N/A') {
      return {
        eligible: true,
        accessQuota: card.railwayLoungeQuota,
        notes: card.spendRequirement
      };
    }
    return {
      eligible: false,
      accessQuota: 'None',
      notes: 'Card does not include Railway Executive Lounge privileges.'
    };
  }

  // Airport lounges
  if (card.eligibleLoungesType === 'railway-only') {
    return {
      eligible: false,
      accessQuota: 'None',
      notes: 'Card only supports IRCTC Railway Executive Lounges.'
    };
  }

  if (card.eligibleLoungesType === 'all-domestic-and-intl') {
    return {
      eligible: true,
      accessQuota: lounge.accessType === 'International' ? card.internationalAirportQuota : card.domesticAirportQuota,
      notes: card.spendRequirement
    };
  }

  if (card.eligibleLoungesType === 'axis-set-a') {
    // Set A covers key metros: DEL, BOM, BLR, MAA, HYD, CCU
    const setACities = ['New Delhi', 'Mumbai', 'Bengaluru', 'Chennai', 'Hyderabad', 'Kolkata'];
    if (setACities.includes(lounge.city) && lounge.accessType === 'Domestic') {
      return {
        eligible: true,
        accessQuota: card.domesticAirportQuota,
        notes: card.spendRequirement
      };
    }
    return {
      eligible: false,
      accessQuota: 'Not in Set A Network',
      notes: 'This card is restricted to Axis Set A lounges (DEL, BOM, BLR, MAA, HYD, CCU).'
    };
  }

  if (lounge.accessType === 'International') {
    if (card.internationalAirportQuota && card.internationalAirportQuota !== 'None') {
      return {
        eligible: true,
        accessQuota: card.internationalAirportQuota,
        notes: card.spendRequirement
      };
    }
    return {
      eligible: false,
      accessQuota: 'Domestic Only',
      notes: 'Complimentary international lounge access not included.'
    };
  }

  return {
    eligible: true,
    accessQuota: card.domesticAirportQuota,
    notes: card.spendRequirement
  };
}
