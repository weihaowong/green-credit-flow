import { useState } from "react";
import Header from "@/components/Header";
import ScoreCard from "@/components/ScoreCard";
import BankConnection from "@/components/BankConnection";
import TransactionFeed from "@/components/TransactionFeed";
import CSVUpload from "@/components/CSVUpload";
import MerchantsList from "@/components/MerchantsList";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  TrendingUp, 
  Leaf, 
  Calendar,
  ArrowRight
} from "lucide-react";

const Index = () => {
  // Sample data - in real app this would come from API/database
  const [userScore, setUserScore] = useState({
    baseScore: 650,
    ecoScore: 18,
    combinedScore: 668,
    scoreMonth: 8 // August
  });

  const [isConnected, setIsConnected] = useState(false);
  const [transactions, setTransactions] = useState([
  {
  id: "1",
  name: "ABLE GLOBAL BERHAD",
  greenScore: 50,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "2",
  name: "ABLEGROUP BERHAD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "3",
  name: "ABM FUJIYA BERHAD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "4",
  name: "ACME HOLDINGS BERHAD",
  greenScore: 50,
  category: "PROPERTY"
},
{
  id: "5",
  name: "ADVANCE SYNERGY BHD",
  greenScore: 75,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "6",
  name: "ADVANCECON HOLDINGS BERHAD",
  greenScore: 75,
  category: "CONSTRUCTION"
},
{
  id: "7",
  name: "ADVENTA BHD",
  greenScore: 50,
  category: "HEALTH CARE"
},
{
  id: "8",
  name: "AE MULTI HOLDINGS BHD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "9",
  name: "AEON CO. (M) BHD",
  greenScore: 100,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "10",
  name: "AEON CREDIT SERVICE (M) BHD",
  greenScore: 75,
  category: "FINANCIAL SERVICES"
},
{
  id: "11",
  name: "AFFIN BANK BERHAD",
  greenScore: 75,
  category: "FINANCIAL SERVICES"
},
{
  id: "12",
  name: "AHB HOLDINGS BHD",
  greenScore: 50,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "13",
  name: "AHMAD ZAKI RESOURCES BHD",
  greenScore: 75,
  category: "CONSTRUCTION"
},
{
  id: "14",
  name: "AIRASIA X BERHAD",
  greenScore: 75,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "15",
  name: "AIZO GROUP BERHAD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "16",
  name: "AJINOMOTO (M) BHD",
  greenScore: 75,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "17",
  name: "AJIYA BHD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "18",
  name: "ALAM MARITIM RESOURCES BHD",
  greenScore: 75,
  category: "ENERGY"
},
{
  id: "19",
  name: "AL-AQAR HEALTHCARE REIT",
  greenScore: 50,
  category: "REAL ESTATE INVESTMENT TRUSTS"
},
{
  id: "20",
  name: "ALCOM GROUP BERHAD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "21",
  name: "ALLIANCE BANK MALAYSIA BERHAD",
  greenScore: 100,
  category: "FINANCIAL SERVICES"
},
{
  id: "22",
  name: "ALLIANZ MALAYSIA BHD",
  greenScore: 100,
  category: "FINANCIAL SERVICES"
},
{
  id: "23",
  name: "AL-SALAM REAL ESTATE INVESTMENT TRUST",
  greenScore: 75,
  category: "REAL ESTATE INVESTMENT TRUSTS"
},
{
  id: "24",
  name: "AMANAHRAYA REITS",
  greenScore: 75,
  category: "REAL ESTATE INVESTMENT TRUSTS"
},
{
  id: "25",
  name: "AME ELITE CONSORTIUM BERHAD",
  greenScore: 75,
  category: "CONSTRUCTION"
},
{
  id: "26",
  name: "AME REAL ESTATE INVESTMENT TRUST",
  greenScore: 50,
  category: "REAL ESTATE INVESTMENT TRUSTS"
},
{
  id: "27",
  name: "AMFIRST REITS",
  greenScore: 75,
  category: "REAL ESTATE INVESTMENT TRUSTS"
},
{
  id: "28",
  name: "AMMB HOLDINGS BHD",
  greenScore: 100,
  category: "FINANCIAL SERVICES"
},
{
  id: "29",
  name: "AMTEL HOLDINGS BHD",
  greenScore: 50,
  category: "TELECOMMUNICATIONS & MEDIA"
},
{
  id: "30",
  name: "AMWAY (M) HOLDINGS BHD",
  greenScore: 50,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "31",
  name: "ANALABS RESOURCES BHD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "32",
  name: "ANCOM NYLEX BERHAD",
  greenScore: 75,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "33",
  name: "ANN JOO RESOURCES BHD",
  greenScore: 75,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "34",
  name: "ANNUM BERHAD",
  greenScore: 25,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "35",
  name: "APB RESOURCES BHD",
  greenScore: 75,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "36",
  name: "APEX EQUITY HOLDINGS BHD",
  greenScore: 75,
  category: "FINANCIAL SERVICES"
},
{
  id: "37",
  name: "APEX HEALTHCARE BHD",
  greenScore: 75,
  category: "HEALTH CARE"
},
{
  id: "38",
  name: "APM AUTOMOTIVE HOLDINGS BHD",
  greenScore: 75,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "39",
  name: "APOLLO FOOD HOLDINGS BHD",
  greenScore: 50,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "40",
  name: "A-RANK BHD",
  greenScore: 75,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "41",
  name: "ARB BERHAD",
  greenScore: 50,
  category: "TECHNOLOGY"
},
{
  id: "42",
  name: "ARK RESOURCES HOLDINGS BERHAD",
  greenScore: 50,
  category: "PROPERTY"
},
{
  id: "43",
  name: "ARKA BERHAD",
  greenScore: 50,
  category: "TRANSPORTATION & LOGISTICS"
},
{
  id: "44",
  name: "ASIA BRANDS BERHAD",
  greenScore: 50,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "45",
  name: "ASIA FILE CORPORATION BHD",
  greenScore: 75,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "46",
  name: "ASIAN PAC HOLDINGS BHD",
  greenScore: 50,
  category: "PROPERTY"
},
{
  id: "47",
  name: "ASTEEL GROUP BERHAD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "48",
  name: "ASTINO BHD",
  greenScore: 75,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "49",
  name: "ASTRAL ASIA BHD",
  greenScore: 50,
  category: "PLANTATION"
},
{
  id: "50",
  name: "ASTRO MALAYSIA HOLDINGS BERHAD",
  greenScore: 100,
  category: "TELECOMMUNICATIONS & MEDIA"
},
{
  id: "51",
  name: "ATA IMS BERHAD",
  greenScore: 75,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "52",
  name: "ATLAN HOLDINGS BHD",
  greenScore: 75,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "53",
  name: "ATRIUM REITS",
  greenScore: 50,
  category: "REAL ESTATE INVESTMENT TRUSTS"
},
{
  id: "54",
  name: "AURELIUS TECHNOLOGIES BERHAD",
  greenScore: 75,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "55",
  name: "AURO HOLDINGS BERHAD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "56",
  name: "AVALAND BERHAD",
  greenScore: 100,
  category: "PROPERTY"
},
{
  id: "57",
  name: "AVANGAAD BERHAD",
  greenScore: 75,
  category: "TRANSPORTATION & LOGISTICS"
},
{
  id: "58",
  name: "AVILLION BERHAD",
  greenScore: 50,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "59",
  name: "AWANBIRU TECHNOLOGY BERHAD",
  greenScore: 100,
  category: "TECHNOLOGY"
},
{
  id: "60",
  name: "AWC BERHAD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "61",
  name: "AXIATA GROUP BERHAD",
  greenScore: 75,
  category: "TELECOMMUNICATIONS & MEDIA"
},
{
  id: "62",
  name: "AXIS REITS",
  greenScore: 100,
  category: "REAL ESTATE INVESTMENT TRUSTS"
},
{
  id: "63",
  name: "AXTERIA GROUP BERHAD",
  greenScore: 50,
  category: "PROPERTY"
},
{
  id: "64",
  name: "AYER HOLDINGS BERHAD",
  greenScore: 50,
  category: "PROPERTY"
},
{
  id: "65",
  name: "AYS VENTURES BHD",
  greenScore: 75,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "66",
  name: "B.I.G. INDUSTRIES BHD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "67",
  name: "BANK ISLAM MALAYSIA BERHAD",
  greenScore: 75,
  category: "FINANCIAL SERVICES"
},
{
  id: "68",
  name: "BATU KAWAN BHD",
  greenScore: 75,
  category: "PLANTATION"
},
{
  id: "69",
  name: "BCB BHD",
  greenScore: 50,
  category: "PROPERTY"
},
{
  id: "70",
  name: "BENALEC HOLDINGS BERHAD",
  greenScore: 50,
  category: "CONSTRUCTION"
},
{
  id: "71",
  name: "BERJAYA ASSETS BERHAD",
  greenScore: 75,
  category: "PROPERTY"
},
{
  id: "72",
  name: "BERJAYA CORPORATION BHD",
  greenScore: 75,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "73",
  name: "BERJAYA FOOD BERHAD",
  greenScore: 100,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "74",
  name: "BERJAYA LAND BHD",
  greenScore: 75,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "75",
  name: "BERMAZ AUTO BERHAD",
  greenScore: 100,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "76",
  name: "BERTAM ALLIANCE BHD",
  greenScore: 50,
  category: "PROPERTY"
},
{
  id: "77",
  name: "BESHOM HOLDINGS BERHAD",
  greenScore: 75,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "78",
  name: "BINA DARULAMAN BHD",
  greenScore: 75,
  category: "PROPERTY"
},
{
  id: "79",
  name: "BINA PURI HOLDINGS BHD",
  greenScore: 50,
  category: "CONSTRUCTION"
},
{
  id: "80",
  name: "BINASTRA CORPORATION BERHAD",
  greenScore: 75,
  category: "CONSTRUCTION"
},
{
  id: "81",
  name: "BINTAI KINDEN CORPORATION BHD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "82",
  name: "BINTULU PORT HOLDINGS BHD",
  greenScore: 75,
  category: "TRANSPORTATION & LOGISTICS"
},
{
  id: "83",
  name: "BLD PLANTATION BHD",
  greenScore: 50,
  category: "PLANTATION"
},
{
  id: "84",
  name: "BM GREENTECH BERHAD",
  greenScore: 75,
  category: "ENERGY"
},
{
  id: "85",
  name: "BONIA CORPORATION BHD",
  greenScore: 50,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "86",
  name: "BORNEO OIL BHD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "87",
  name: "BOUSTEAD HEAVY INDUSTRIES CORP",
  greenScore: 75,
  category: "TRANSPORTATION & LOGISTICS"
},
{
  id: "88",
  name: "BOX-PAK (MALAYSIA) BHD",
  greenScore: 75,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "89",
  name: "BP PLASTICS HOLDING BHD",
  greenScore: 75,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "90",
  name: "BRIGHT PACKAGING INDUSTRY BHD",
  greenScore: 75,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "91",
  name: "BRITISH AMERICAN TOBACCO (M)",
  greenScore: 100,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "92",
  name: "BSL CORPORATION BERHAD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "93",
  name: "BTM RESOURCES BHD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "94",
  name: "BUMI ARMADA BERHAD",
  greenScore: 100,
  category: "ENERGY"
},
{
  id: "95",
  name: "BURSA MALAYSIA BHD",
  greenScore: 100,
  category: "FINANCIAL SERVICES"
},
{
  id: "96",
  name: "C.I. HOLDINGS BHD",
  greenScore: 75,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "97",
  name: "CAB CAKARAN CORPORATION BHD",
  greenScore: 50,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "98",
  name: "CAHYA MATA SARAWAK BHD",
  greenScore: 75,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "99",
  name: "CAM RESOURCES BHD",
  greenScore: 50,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "100",
  name: "CAN-ONE BHD",
  greenScore: 75,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "101",
  name: "CAPE EMS BERHAD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "102",
  name: "CAPITAL A BERHAD",
  greenScore: 75,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "103",
  name: "CAPITALAND MALAYSIA TRUST",
  greenScore: 100,
  category: "REAL ESTATE INVESTMENT TRUSTS"
},
{
  id: "104",
  name: "CAREPLUS GROUP BERHAD",
  greenScore: 75,
  category: "HEALTH CARE"
},
{
  id: "105",
  name: "CARIMIN PETROLEUM BERHAD",
  greenScore: 75,
  category: "ENERGY"
},
{
  id: "106",
  name: "CARLSBERG BREWERY MALAYSIA BHD",
  greenScore: 75,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "107",
  name: "CB INDUSTRIAL PRODUCT HOLDING",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "108",
  name: "CCK CONSOLIDATED HOLDINGS BHD",
  greenScore: 50,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "109",
  name: "CELCOMDIGI BERHAD",
  greenScore: 100,
  category: "TELECOMMUNICATIONS & MEDIA"
},
{
  id: "110",
  name: "CENSOF HOLDINGS BERHAD",
  greenScore: 75,
  category: "TECHNOLOGY"
},
{
  id: "111",
  name: "CENTRAL GLOBAL BERHAD",
  greenScore: 75,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "112",
  name: "CEPATWAWASAN GROUP BHD",
  greenScore: 50,
  category: "PLANTATION"
},
{
  id: "113",
  name: "CHEETAH HOLDINGS BHD",
  greenScore: 50,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "114",
  name: "CHIN HIN GROUP BERHAD",
  greenScore: 75,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "115",
  name: "CHIN HIN GROUP PROPERTY BERHAD",
  greenScore: 50,
  category: "TRANSPORTATION & LOGISTICS"
},
{
  id: "116",
  name: "CHIN TECK PLANTATIONS BHD",
  greenScore: 50,
  category: "PLANTATION"
},
{
  id: "117",
  name: "CHIN WELL HOLDINGS BHD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "118",
  name: "CHINA OUHUA WINERY HLDGS LTD",
  greenScore: 50,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "119",
  name: "CHOO BEE METAL INDUSTRIES BHD",
  greenScore: 75,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "120",
  name: "CHUAN HUAT RESOURCES BHD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "121",
  name: "CIMB GROUP HOLDINGS BERHAD",
  greenScore: 100,
  category: "FINANCIAL SERVICES"
},
{
  id: "122",
  name: "CITAGLOBAL BERHAD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "123",
  name: "CITRA NUSA HOLDINGS BERHAD",
  greenScore: 50,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "124",
  name: "CJ CENTURY LOGISTICS HOLDINGS BERHAD",
  greenScore: 75,
  category: "TRANSPORTATION & LOGISTICS"
},
{
  id: "125",
  name: "CLASSITA HOLDINGS BERHAD",
  greenScore: 75,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "126",
  name: "CME GROUP BHD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "127",
  name: "CN ASIA CORPORATION BHD",
  greenScore: 75,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "128",
  name: "CNERGENZ BERHAD",
  greenScore: 50,
  category: "TECHNOLOGY"
},
{
  id: "129",
  name: "COASTAL CONTRACTS BHD",
  greenScore: 50,
  category: "ENERGY"
},
{
  id: "130",
  name: "COMFORT GLOVES BERHAD",
  greenScore: 75,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "131",
  name: "COMPUGATES HOLDINGS BHD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "132",
  name: "COMPUTER FORMS (M) BHD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "133",
  name: "CONCRETE ENGINEERING PRODUCTS",
  greenScore: 75,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "134",
  name: "COUNTRY HEIGHTS HOLDINGS BHD",
  greenScore: 50,
  category: "PROPERTY"
},
{
  id: "135",
  name: "COUNTRY VIEW BHD",
  greenScore: 50,
  category: "PROPERTY"
},
{
  id: "136",
  name: "CPE TECHNOLOGY BERHAD",
  greenScore: 75,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "137",
  name: "CRESCENDO CORPORATION BHD",
  greenScore: 50,
  category: "PROPERTY"
},
{
  id: "138",
  name: "CREST BUILDER HOLDINGS BHD",
  greenScore: 50,
  category: "CONSTRUCTION"
},
{
  id: "139",
  name: "CSC STEEL HOLDINGS BERHAD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "140",
  name: "CTOS DIGITAL BERHAD",
  greenScore: 75,
  category: "TECHNOLOGY"
},
{
  id: "141",
  name: "CUSCAPI BHD",
  greenScore: 50,
  category: "TECHNOLOGY"
},
{
  id: "142",
  name: "CWG HOLDINGS BERHAD",
  greenScore: 75,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "143",
  name: "CYBERJAYA EDUCATION GROUP BERHAD",
  greenScore: 75,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "144",
  name: "CYL CORPORATION BHD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "145",
  name: "CYPARK RESOURCES BERHAD",
  greenScore: 75,
  category: "ENERGY"
},
{
  id: "146",
  name: "D & O GREEN TECHNOLOGIES BERHAD",
  greenScore: 75,
  category: "TECHNOLOGY"
},
{
  id: "147",
  name: "DAGANG NEXCHANGE BERHAD",
  greenScore: 75,
  category: "TECHNOLOGY"
},
{
  id: "148",
  name: "DANCOMECH HOLDINGS BERHAD",
  greenScore: 75,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "149",
  name: "DATAPREP HOLDINGS BHD",
  greenScore: 50,
  category: "TECHNOLOGY"
},
{
  id: "150",
  name: "DAYANG ENTERPRISE HOLDINGS BHD",
  greenScore: 75,
  category: "ENERGY"
},
{
  id: "151",
  name: "DELEUM BHD",
  greenScore: 100,
  category: "ENERGY"
},
{
  id: "152",
  name: "DESTINI BERHAD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "153",
  name: "DFCITY GROUP BERHAD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "154",
  name: "DIALOG GROUP BHD",
  greenScore: 75,
  category: "ENERGY"
},
{
  id: "155",
  name: "DIGISTAR CORPORATION BHD",
  greenScore: 75,
  category: "TECHNOLOGY"
},
{
  id: "156",
  name: "DKLS INDUSTRIES BHD",
  greenScore: 50,
  category: "CONSTRUCTION"
},
{
  id: "157",
  name: "DKSH HOLDINGS(M)BHD",
  greenScore: 100,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "158",
  name: "DNONCE TECHNOLOGY BHD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "159",
  name: "DOMINANT ENTERPRISE BHD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "160",
  name: "DPS RESOURCES BHD",
  greenScore: 50,
  category: "PROPERTY"
},
{
  id: "161",
  name: "DRB-HICOM BHD",
  greenScore: 75,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "162",
  name: "DS SIGMA HOLDINGS BERHAD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "163",
  name: "DUFU TECHNOLOGY CORP. BHD",
  greenScore: 100,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "164",
  name: "DUOPHARMA BIOTECH BERHAD",
  greenScore: 100,
  category: "HEALTH CARE"
},
{
  id: "165",
  name: "DUTALAND BHD",
  greenScore: 75,
  category: "PLANTATION"
},
{
  id: "166",
  name: "DUTCH LADY MILK INDUSTRIES BHD",
  greenScore: 100,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "167",
  name: "DXN HOLDINGS BHD.",
  greenScore: 75,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "168",
  name: "EASTERN & ORIENTAL BHD",
  greenScore: 75,
  category: "PROPERTY"
},
{
  id: "169",
  name: "ECM LIBRA GROUP BERHAD",
  greenScore: 50,
  category: "FINANCIAL SERVICES"
},
{
  id: "170",
  name: "ECO WORLD DEVELOPMENT GROUP BERHAD",
  greenScore: 100,
  category: "PROPERTY"
},
{
  id: "171",
  name: "ECO WORLD INTERNATIONAL BERHAD",
  greenScore: 100,
  category: "PROPERTY"
},
{
  id: "172",
  name: "ECOBUILT HOLDINGS BERHAD",
  greenScore: 50,
  category: "TELECOMMUNICATIONS & MEDIA"
},
{
  id: "173",
  name: "ECOFIRST CONSOLIDATED BHD",
  greenScore: 75,
  category: "PROPERTY"
},
{
  id: "174",
  name: "ECOMATE HOLDINGS BERHAD",
  greenScore: 75,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "175",
  name: "ECONPILE HOLDINGS BHD",
  greenScore: 50,
  category: "CONSTRUCTION"
},
{
  id: "176",
  name: "EDARAN BHD",
  greenScore: 50,
  category: "TECHNOLOGY"
},
{
  id: "177",
  name: "EDEN INC. BHD",
  greenScore: 50,
  category: "UTILITIES"
},
{
  id: "178",
  name: "EFFICIENT E-SOLUTIONS BHD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "179",
  name: "EG INDUSTRIES BHD",
  greenScore: 75,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "180",
  name: "EITA RESOURCES BERHAD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "181",
  name: "EKOVEST BHD",
  greenScore: 50,
  category: "CONSTRUCTION"
},
{
  id: "182",
  name: "EKSONS CORPORATION BHD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "183",
  name: "ELK-DESA RESOURCES BERHAD",
  greenScore: 50,
  category: "FINANCIAL SERVICES"
},
{
  id: "184",
  name: "ELSOFT RESEARCH BHD",
  greenScore: 75,
  category: "TECHNOLOGY"
},
{
  id: "185",
  name: "EMICO HOLDINGS BHD",
  greenScore: 50,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "186",
  name: "ENCORP BHD",
  greenScore: 50,
  category: "PROPERTY"
},
{
  id: "187",
  name: "ENG KAH CORPORATION BHD",
  greenScore: 50,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "188",
  name: "ENGTEX GROUP BHD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "189",
  name: "ENRA GROUP BERHAD",
  greenScore: 75,
  category: "ENERGY"
},
{
  id: "190",
  name: "EONMETALL GROUP BHD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "191",
  name: "EP MANUFACTURING BHD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "192",
  name: "EPICON BERHAD",
  greenScore: 50,
  category: "CONSTRUCTION"
},
{
  id: "193",
  name: "ESTHETICS INTERNATIONAL GROUP",
  greenScore: 50,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "194",
  name: "EUPE CORPORATION BHD",
  greenScore: 50,
  category: "PROPERTY"
},
{
  id: "195",
  name: "EURO HOLDINGS BHD",
  greenScore: 50,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "196",
  name: "EUROSPAN HOLDINGS BHD",
  greenScore: 75,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "197",
  name: "EVERGREEN FIBREBOARD BHD",
  greenScore: 75,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "198",
  name: "EVERSENDAI CORPORATION BERHAD",
  greenScore: 50,
  category: "CONSTRUCTION"
},
{
  id: "199",
  name: "EXCEL FORCE MSC BHD",
  greenScore: 75,
  category: "TECHNOLOGY"
},
{
  id: "200",
  name: "EXSIM HOSPITALITY BERHAD",
  greenScore: 50,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "201",
  name: "FACB INDUSTRIES INCORPORATED",
  greenScore: 75,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "202",
  name: "FAJARBARU BUILDER GRP BHD",
  greenScore: 75,
  category: "CONSTRUCTION"
},
{
  id: "203",
  name: "FAR EAST HOLDINGS BHD",
  greenScore: 50,
  category: "PLANTATION"
},
{
  id: "204",
  name: "FARLIM GROUP (M) BHD",
  greenScore: 50,
  category: "PROPERTY"
},
{
  id: "205",
  name: "FARM FRESH BERHAD",
  greenScore: 75,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "206",
  name: "FAVELLE FAVCO BHD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "207",
  name: "FCW HOLDINGS BHD",
  greenScore: 50,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "208",
  name: "FEDERAL INTERNATIONAL HOLDINGS BERHAD",
  greenScore: 50,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "209",
  name: "FGV HOLDINGS BERHAD",
  greenScore: 75,
  category: "PLANTATION"
},
{
  id: "210",
  name: "FIAMMA HOLDINGS BHD",
  greenScore: 50,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "211",
  name: "FIBON BERHAD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "212",
  name: "FIMA CORPORATION BHD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "213",
  name: "FITTERS DIVERSIFIED BHD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "214",
  name: "FM GLOBAL LOGISTICS HOLDINGS BERHAD",
  greenScore: 75,
  category: "TRANSPORTATION & LOGISTICS"
},
{
  id: "215",
  name: "FOCUS LUMBER BERHAD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "216",
  name: "FOCUS POINT HOLDINGS BERHAD",
  greenScore: 75,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "217",
  name: "FORMOSA PROSONIC INDUSTRIES",
  greenScore: 50,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "218",
  name: "FOUNDPAC GROUP BERHAD",
  greenScore: 75,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "219",
  name: "FRASER & NEAVE HOLDINGS BHD",
  greenScore: 100,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "220",
  name: "FRONTKEN CORPORATION BHD",
  greenScore: 100,
  category: "TECHNOLOGY"
},
{
  id: "221",
  name: "FSBM HOLDINGS BHD",
  greenScore: 50,
  category: "TECHNOLOGY"
},
{
  id: "222",
  name: "G CAPITAL BERHAD",
  greenScore: 50,
  category: "TRANSPORTATION & LOGISTICS"
},
{
  id: "223",
  name: "G3 GLOBAL BERHAD",
  greenScore: 75,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "224",
  name: "GABUNGAN AQRS BERHAD",
  greenScore: 75,
  category: "CONSTRUCTION"
},
{
  id: "225",
  name: "GADANG HOLDINGS BHD",
  greenScore: 50,
  category: "CONSTRUCTION"
},
{
  id: "226",
  name: "GAMUDA BHD",
  greenScore: 75,
  category: "CONSTRUCTION"
},
{
  id: "227",
  name: "GAS MALAYSIA BERHAD",
  greenScore: 75,
  category: "UTILITIES"
},
{
  id: "228",
  name: "GDB HOLDINGS BERHAD",
  greenScore: 75,
  category: "CONSTRUCTION"
},
{
  id: "229",
  name: "GDEX BERHAD",
  greenScore: 75,
  category: "TRANSPORTATION & LOGISTICS"
},
{
  id: "230",
  name: "GENETEC TECHNOLOGY BERHAD",
  greenScore: 75,
  category: "TECHNOLOGY"
},
{
  id: "231",
  name: "GENTING BHD",
  greenScore: 75,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "232",
  name: "GENTING MALAYSIA BERHAD",
  greenScore: 100,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "233",
  name: "GENTING PLANTATIONS BERHAD",
  greenScore: 75,
  category: "PLANTATION"
},
{
  id: "234",
  name: "GEORGE KENT (M) BHD",
  greenScore: 100,
  category: "CONSTRUCTION"
},
{
  id: "235",
  name: "GE-SHEN CORPORATION BHD",
  greenScore: 75,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "236",
  name: "GFM SERVICES BERHAD",
  greenScore: 75,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "237",
  name: "GIIB HOLDINGS BERHAD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "238",
  name: "GLOBAL ORIENTAL BERHAD",
  greenScore: 50,
  category: "PROPERTY"
},
{
  id: "239",
  name: "GLOBALTEC FORMATION BERHAD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "240",
  name: "GLOBETRONICS TECHNOLOGY BHD",
  greenScore: 75,
  category: "TECHNOLOGY"
},
{
  id: "241",
  name: "GLOMAC BHD",
  greenScore: 50,
  category: "PROPERTY"
},
{
  id: "242",
  name: "GOLDEN LAND BERHAD",
  greenScore: 50,
  category: "PLANTATION"
},
{
  id: "243",
  name: "GOLDEN PHAROS BHD",
  greenScore: 75,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "244",
  name: "GOPENG BHD",
  greenScore: 50,
  category: "PLANTATION"
},
{
  id: "245",
  name: "GRAND CENTRAL ENTERPRISES BHD",
  greenScore: 50,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "246",
  name: "GREATECH TECHNOLOGY BERHAD",
  greenScore: 100,
  category: "TECHNOLOGY"
},
{
  id: "247",
  name: "GREATER BAY HOLDINGS BERHAD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "248",
  name: "GREEN PACKET BHD",
  greenScore: 75,
  category: "TELECOMMUNICATIONS & MEDIA"
},
{
  id: "249",
  name: "GREENYIELD BHD",
  greenScore: 50,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "250",
  name: "GROMUTUAL BHD",
  greenScore: 50,
  category: "PROPERTY"
},
{
  id: "251",
  name: "GUAN CHONG BHD",
  greenScore: 75,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "252",
  name: "GUH HOLDINGS BHD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "253",
  name: "GUOCOLAND (MALAYSIA) BHD",
  greenScore: 50,
  category: "PROPERTY"
},
{
  id: "254",
  name: "HANDAL ENERGY BERHAD",
  greenScore: 50,
  category: "ENERGY"
},
{
  id: "255",
  name: "HAP SENG CONSOLIDATED BHD",
  greenScore: 75,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "256",
  name: "HAP SENG PLANTATIONS HOLDINGS",
  greenScore: 75,
  category: "PLANTATION"
},
{
  id: "257",
  name: "HARBOUR-LINK GROUP BHD",
  greenScore: 75,
  category: "TRANSPORTATION & LOGISTICS"
},
{
  id: "258",
  name: "HARN LEN CORPORATION BHD",
  greenScore: 50,
  category: "PLANTATION"
},
{
  id: "259",
  name: "HARRISONS HOLDINGS (M) BHD",
  greenScore: 50,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "260",
  name: "HARTALEGA HOLDINGS BHD",
  greenScore: 100,
  category: "HEALTH CARE"
},
{
  id: "261",
  name: "HB GLOBAL LIMITED",
  greenScore: 50,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "262",
  name: "HCK CAPITAL GROUP BERHAD",
  greenScore: 50,
  category: "PROPERTY"
},
{
  id: "263",
  name: "HEINEKEN MALAYSIA BERHAD",
  greenScore: 100,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "264",
  name: "HEITECH PADU BHD",
  greenScore: 75,
  category: "TECHNOLOGY"
},
{
  id: "265",
  name: "HEKTAR REITS",
  greenScore: 75,
  category: "REAL ESTATE INVESTMENT TRUSTS"
},
{
  id: "266",
  name: "HENGYUAN REFINING COMPANY BERHAD",
  greenScore: 100,
  category: "ENERGY"
},
{
  id: "267",
  name: "HEVEABOARD BHD",
  greenScore: 75,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "268",
  name: "HEXTAR GLOBAL BERHAD",
  greenScore: 75,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "269",
  name: "HEXTAR HEALTHCARE BERHAD",
  greenScore: 100,
  category: "HEALTH CARE"
},
{
  id: "270",
  name: "HEXTAR INDUSTRIES BERHAD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "271",
  name: "HEXTAR RETAIL BERHAD",
  greenScore: 75,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "272",
  name: "HEXTAR TECHNOLOGIES SOLUTIONS BERHAD",
  greenScore: 50,
  category: "TRANSPORTATION & LOGISTICS"
},
{
  id: "273",
  name: "HEXZA CORPORATION BHD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "274",
  name: "HIAP TECK VENTURE BHD",
  greenScore: 75,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "275",
  name: "HIBISCUS PETROLEUM BHD",
  greenScore: 75,
  category: "ENERGY"
},
{
  id: "276",
  name: "HIL INDUSTRIES BHD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "277",
  name: "HO HUP CONSTRUCTION COMPANY",
  greenScore: 50,
  category: "CONSTRUCTION"
},
{
  id: "278",
  name: "HO WAH GENTING BHD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "279",
  name: "HOMERITZ CORPORATION BERHAD",
  greenScore: 75,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "280",
  name: "HONG LEONG BANK BHD",
  greenScore: 100,
  category: "FINANCIAL SERVICES"
},
{
  id: "281",
  name: "HONG LEONG CAPITAL BERHAD",
  greenScore: 75,
  category: "FINANCIAL SERVICES"
},
{
  id: "282",
  name: "HONG LEONG FINANCIAL GROUP BHD",
  greenScore: 100,
  category: "FINANCIAL SERVICES"
},
{
  id: "283",
  name: "HONG LEONG INDUSTRIES BHD",
  greenScore: 100,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "284",
  name: "HONG SENG CONSOLIDATED BERHAD",
  greenScore: 75,
  category: "TECHNOLOGY"
},
{
  id: "285",
  name: "HPMT HOLDINGS BERHAD",
  greenScore: 75,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "286",
  name: "HSS ENGINEERS BERHAD",
  greenScore: 75,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "287",
  name: "HUA YANG BHD",
  greenScore: 50,
  category: "PROPERTY"
},
{
  id: "288",
  name: "HUBLINE BHD",
  greenScore: 75,
  category: "TRANSPORTATION & LOGISTICS"
},
{
  id: "289",
  name: "HUME CEMENT INDUSTRIES BERHAD",
  greenScore: 100,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "290",
  name: "HUP SENG INDUSTRIES BHD",
  greenScore: 75,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "291",
  name: "HWA TAI INDUSTRIES BHD",
  greenScore: 50,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "292",
  name: "I-BHD",
  greenScore: 50,
  category: "PROPERTY"
},
{
  id: "293",
  name: "IBRACO BHD",
  greenScore: 75,
  category: "PROPERTY"
},
{
  id: "294",
  name: "ICAPITAL.BIZ BHD",
  greenScore: 75,
  category: "CLOSED END FUND"
},
{
  id: "295",
  name: "ICONIC WORLDWIDE BERHAD",
  greenScore: 50,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "296",
  name: "IDEAL CAPITAL BERHAD",
  greenScore: 25,
  category: "PROPERTY"
},
{
  id: "297",
  name: "IGB BERHAD",
  greenScore: 75,
  category: "PROPERTY"
},
{
  id: "298",
  name: "IGB COMMERCIAL REAL ESTATE INVESTMENT TRUST",
  greenScore: 75,
  category: "REAL ESTATE INVESTMENT TRUSTS"
},
{
  id: "299",
  name: "IGB REAL ESTATE INV TRUST",
  greenScore: 75,
  category: "REAL ESTATE INVESTMENT TRUSTS"
},
{
  id: "300",
  name: "IHH HEALTHCARE BERHAD",
  greenScore: 75,
  category: "HEALTH CARE"
},
{
  id: "301",
  name: "IJM CORPORATION BHD",
  greenScore: 75,
  category: "CONSTRUCTION"
},
{
  id: "302",
  name: "IMASPRO CORPORATION BHD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "303",
  name: "INARI AMERTRON BERHAD",
  greenScore: 100,
  category: "TECHNOLOGY"
},
{
  id: "304",
  name: "INCH KENNETH KAJANG RUBBER PLC",
  greenScore: 50,
  category: "PLANTATION"
},
{
  id: "305",
  name: "INDUSTRONICS BHD",
  greenScore: 50,
  category: "TECHNOLOGY"
},
{
  id: "306",
  name: "INFOLINE TEC GROUP BERHAD",
  greenScore: 50,
  category: "TECHNOLOGY"
},
{
  id: "307",
  name: "INFRAHARTA HOLDINGS BERHAD",
  greenScore: 50,
  category: "CONSTRUCTION"
},
{
  id: "308",
  name: "INGENIEUR GUDANG BERHAD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "309",
  name: "INNATURE BERHAD",
  greenScore: 100,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "310",
  name: "INNOPRISE PLANTATIONS BERHAD",
  greenScore: 50,
  category: "PLANTATION"
},
{
  id: "311",
  name: "INSAS BHD",
  greenScore: 50,
  category: "FINANCIAL SERVICES"
},
{
  id: "312",
  name: "INTA BINA GROUP BERHAD",
  greenScore: 50,
  category: "CONSTRUCTION"
},
{
  id: "313",
  name: "IOI CORPORATION BHD",
  greenScore: 100,
  category: "PLANTATION"
},
{
  id: "314",
  name: "IOI PROPERTIES GROUP BERHAD",
  greenScore: 100,
  category: "PROPERTY"
},
{
  id: "315",
  name: "IQ GROUP HOLDINGS BHD",
  greenScore: 50,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "316",
  name: "IREKA CORPORATION BHD",
  greenScore: 50,
  category: "CONSTRUCTION"
},
{
  id: "317",
  name: "ISKANDAR WATERFRONT CITY BERHAD",
  greenScore: 50,
  category: "PROPERTY"
},
{
  id: "318",
  name: "ITMAX SYSTEM BERHAD",
  greenScore: 50,
  category: "TECHNOLOGY"
},
{
  id: "319",
  name: "IVORY PROPERTIES GROUP BERHAD",
  greenScore: 50,
  category: "PROPERTY"
},
{
  id: "320",
  name: "JADI IMAGING HOLDINGS BHD",
  greenScore: 50,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "321",
  name: "JAKS RESOURCES BERHAD",
  greenScore: 75,
  category: "CONSTRUCTION"
},
{
  id: "322",
  name: "JASA KITA BHD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "323",
  name: "JAYA TIASA HOLDINGS BHD",
  greenScore: 75,
  category: "PLANTATION"
},
{
  id: "324",
  name: "JAYCORP BHD",
  greenScore: 50,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "325",
  name: "JCBNEXT BERHAD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "326",
  name: "JCY INTERNATIONAL BERHAD",
  greenScore: 50,
  category: "TECHNOLOGY"
},
{
  id: "327",
  name: "JENTAYU SUSTAINABLES BERHAD",
  greenScore: 75,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "328",
  name: "JF TECHNOLOGY BHD",
  greenScore: 75,
  category: "TECHNOLOGY"
},
{
  id: "329",
  name: "JHM CONSOLIDATION BHD",
  greenScore: 75,
  category: "TECHNOLOGY"
},
{
  id: "330",
  name: "JIANKUN INTERNATIONAL BERHAD",
  greenScore: 50,
  category: "PROPERTY"
},
{
  id: "331",
  name: "JKG LAND BERHAD",
  greenScore: 75,
  category: "PROPERTY"
},
{
  id: "332",
  name: "JOE HOLDING BERHAD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "333",
  name: "JOHAN HOLDINGS BHD",
  greenScore: 75,
  category: "FINANCIAL SERVICES"
},
{
  id: "334",
  name: "K. SENG SENG CORPORATION BHD",
  greenScore: 75,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "335",
  name: "KAMDAR GROUP(M)BHD",
  greenScore: 50,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "336",
  name: "KAREX BERHAD",
  greenScore: 100,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "337",
  name: "KARYON INDUSTRIES BHD",
  greenScore: 75,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "338",
  name: "KAWAN FOOD BHD",
  greenScore: 100,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "339",
  name: "KECK SENG (M) BHD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "340",
  name: "KEIN HING INTERNATIONAL BHD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "341",
  name: "KELINGTON GROUP BERHAD",
  greenScore: 100,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "342",
  name: "KEN HOLDINGS BHD",
  greenScore: 50,
  category: "PROPERTY"
},
{
  id: "343",
  name: "KENANGA INVESTMENT BANK BERHAD",
  greenScore: 100,
  category: "FINANCIAL SERVICES"
},
{
  id: "344",
  name: "KERJAYA PROSPEK GROUP BERHAD",
  greenScore: 75,
  category: "CONSTRUCTION"
},
{
  id: "345",
  name: "KERJAYA PROSPEK PROPERTY BERHAD",
  greenScore: 50,
  category: "PROPERTY"
},
{
  id: "346",
  name: "KESM INDUSTRIES BHD",
  greenScore: 75,
  category: "TECHNOLOGY"
},
{
  id: "347",
  name: "KEY ASIC BHD",
  greenScore: 50,
  category: "TECHNOLOGY"
},
{
  id: "348",
  name: "KHEE SAN BHD",
  greenScore: 50,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "349",
  name: "KHIND HOLDINGS BHD",
  greenScore: 50,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "350",
  name: "KIA LIM BHD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "351",
  name: "KIM HIN INDUSTRY BHD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "352",
  name: "KIM LOONG RESOURCES BHD",
  greenScore: 50,
  category: "PLANTATION"
},
{
  id: "353",
  name: "KIM TECK CHEONG CONSOLIDATED BERHAD",
  greenScore: 50,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "354",
  name: "KIMLUN CORPORATION BERHAD",
  greenScore: 50,
  category: "CONSTRUCTION"
},
{
  id: "355",
  name: "KINERGY ADVANCEMENT BERHAD",
  greenScore: 75,
  category: "ENERGY"
},
{
  id: "356",
  name: "KIP REAL ESTATE INVESTMENT TRUST",
  greenScore: 75,
  category: "REAL ESTATE INVESTMENT TRUSTS"
},
{
  id: "357",
  name: "KKB ENGINEERING BHD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "358",
  name: "KLCC PROP&REITS-STAPLED SEC",
  greenScore: 75,
  category: "REAL ESTATE INVESTMENT TRUSTS"
},
{
  id: "359",
  name: "KLUANG RUBBER CO (M) BHD",
  greenScore: 50,
  category: "PLANTATION"
},
{
  id: "360",
  name: "KNM GROUP BHD",
  greenScore: 50,
  category: "ENERGY"
},
{
  id: "361",
  name: "KNUSFORD BHD",
  greenScore: 75,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "362",
  name: "KOBAY TECHNOLOGY BHD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "363",
  name: "KOMARKCORP BHD",
  greenScore: 75,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "364",
  name: "KOSSAN RUBBER INDUSTRIES BHD",
  greenScore: 100,
  category: "HEALTH CARE"
},
{
  id: "365",
  name: "KOTRA INDUSTRIES BHD",
  greenScore: 75,
  category: "HEALTH CARE"
},
{
  id: "366",
  name: "KPJ HEALTHCARE BHD",
  greenScore: 100,
  category: "HEALTH CARE"
},
{
  id: "367",
  name: "KPS CONSORTIUM BHD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "368",
  name: "KRETAM HOLDINGS BHD",
  greenScore: 50,
  category: "PLANTATION"
},
{
  id: "369",
  name: "KSL HOLDINGS BHD",
  greenScore: 75,
  category: "PROPERTY"
},
{
  id: "370",
  name: "KUALA LUMPUR KEPONG BHD",
  greenScore: 75,
  category: "PLANTATION"
},
{
  id: "371",
  name: "KUB MALAYSIA BHD",
  greenScore: 75,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "372",
  name: "KUCHAI DEVELOPMENT BHD",
  greenScore: 50,
  category: "FINANCIAL SERVICES"
},
{
  id: "373",
  name: "KUMPULAN FIMA BHD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "374",
  name: "KUMPULAN H&L HIGH-TECH BHD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "375",
  name: "KUMPULAN JETSON BHD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "376",
  name: "KUMPULAN KITACON BERHAD",
  greenScore: 50,
  category: "CONSTRUCTION"
},
{
  id: "377",
  name: "KUMPULAN PERANGSANG SELANGOR",
  greenScore: 75,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "378",
  name: "KYM HOLDINGS BHD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "379",
  name: "L&P GLOBAL BERHAD",
  greenScore: 75,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "380",
  name: "LAGENDA PROPERTIES BERHAD",
  greenScore: 75,
  category: "PROPERTY"
},
{
  id: "381",
  name: "LAND & GENERAL BHD",
  greenScore: 75,
  category: "PROPERTY"
},
{
  id: "382",
  name: "LANDMARKS BHD",
  greenScore: 50,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "383",
  name: "LAY HONG BHD",
  greenScore: 50,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "384",
  name: "LB ALUMINIUM BHD",
  greenScore: 75,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "385",
  name: "LBI CAPITAL BHD",
  greenScore: 25,
  category: "PROPERTY"
},
{
  id: "386",
  name: "LBS BINA GROUP BHD",
  greenScore: 75,
  category: "PROPERTY"
},
{
  id: "387",
  name: "LEADER STEEL HOLDINGS BHD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "388",
  name: "LEBTECH BERHAD",
  greenScore: 25,
  category: "CONSTRUCTION"
},
{
  id: "389",
  name: "LEE SWEE KIAT GROUP BHD",
  greenScore: 75,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "390",
  name: "LEON FUAT BERHAD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "391",
  name: "LEONG HUP INTERNATIONAL BERHAD",
  greenScore: 50,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "392",
  name: "LFE CORPORATION BHD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "393",
  name: "LIANSON FLEET GROUP BERHAD",
  greenScore: 75,
  category: "ENERGY"
},
{
  id: "394",
  name: "LIEN HOE CORPORATION BHD",
  greenScore: 50,
  category: "PROPERTY"
},
{
  id: "395",
  name: "LII HEN INDUSTRIES BHD",
  greenScore: 75,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "396",
  name: "LION INDUSTRIES CORPORATION",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "397",
  name: "LION POSIM BERHAD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "398",
  name: "LOTTE CHEMICAL TITAN HOLDING BERHAD",
  greenScore: 75,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "399",
  name: "LOTUS CIRCULAR BERHAD",
  greenScore: 50,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "400",
  name: "LOTUS KFM BERHAD",
  greenScore: 50,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "401",
  name: "LPI CAPITAL BHD",
  greenScore: 75,
  category: "FINANCIAL SERVICES"
},
{
  id: "402",
  name: "LTKM BHD",
  greenScore: 50,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "403",
  name: "LUSTER INDUSTRIES BHD",
  greenScore: 75,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "404",
  name: "LUXCHEM CORPORATION BHD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "405",
  name: "LYSAGHT GALVANIZED STEEL BHD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "406",
  name: "M & A EQUITY HOLDINGS BERHAD",
  greenScore: 75,
  category: "FINANCIAL SERVICES"
},
{
  id: "407",
  name: "MAA GROUP BERHAD",
  greenScore: 50,
  category: "FINANCIAL SERVICES"
},
{
  id: "408",
  name: "MAGMA GROUP BERHAD",
  greenScore: 50,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "409",
  name: "MAGNA PRIMA BHD",
  greenScore: 50,
  category: "PROPERTY"
},
{
  id: "410",
  name: "MAGNI-TECH INDUSTRIES BHD",
  greenScore: 50,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "411",
  name: "MAGNUM BERHAD",
  greenScore: 75,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "412",
  name: "MAH SING GROUP BHD",
  greenScore: 100,
  category: "PROPERTY"
},
{
  id: "413",
  name: "MAJUPERAK HOLDINGS BHD",
  greenScore: 50,
  category: "PROPERTY"
},
{
  id: "414",
  name: "MALAKOFF CORPORATION BERHAD",
  greenScore: 75,
  category: "UTILITIES"
},
{
  id: "415",
  name: "MALAYAN BANKING BHD",
  greenScore: 100,
  category: "FINANCIAL SERVICES"
},
{
  id: "416",
  name: "MALAYAN CEMENT BERHAD",
  greenScore: 75,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "417",
  name: "MALAYAN FLOUR MILLS BHD",
  greenScore: 75,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "418",
  name: "MALAYAN UNITED INDUSTRIES BHD",
  greenScore: 50,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "419",
  name: "MALAYSIA MARINE AND HEAVY ENG",
  greenScore: 100,
  category: "ENERGY"
},
{
  id: "420",
  name: "MALAYSIA SMELTING CORPORATION",
  greenScore: 75,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "421",
  name: "MALAYSIA STEEL WORKS (KL)BHD",
  greenScore: 100,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "422",
  name: "MALAYSIAN PACIFIC INDUSTRIES",
  greenScore: 100,
  category: "TECHNOLOGY"
},
{
  id: "423",
  name: "MALAYSIAN RESOURCES CORPORATION BERHAD",
  greenScore: 100,
  category: "PROPERTY"
},
{
  id: "424",
  name: "MALPAC HOLDINGS BHD",
  greenScore: 50,
  category: "PLANTATION"
},
{
  id: "425",
  name: "MALTON BHD",
  greenScore: 75,
  category: "PROPERTY"
},
{
  id: "426",
  name: "MANULIFE HOLDINGS BERHAD",
  greenScore: 75,
  category: "FINANCIAL SERVICES"
},
{
  id: "427",
  name: "MARCO HOLDINGS BHD",
  greenScore: 25,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "428",
  name: "MARINE & GENERAL BERHAD",
  greenScore: 75,
  category: "TRANSPORTATION & LOGISTICS"
},
{
  id: "429",
  name: "MASTER-PACK GROUP BERHAD",
  greenScore: 75,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "430",
  name: "MATRIX CONCEPTS HOLDINGS BHD",
  greenScore: 75,
  category: "PROPERTY"
},
{
  id: "431",
  name: "MAXIM GLOBAL BERHAD",
  greenScore: 75,
  category: "PROPERTY"
},
{
  id: "432",
  name: "MAXIS BERHAD",
  greenScore: 75,
  category: "TELECOMMUNICATIONS & MEDIA"
},
{
  id: "433",
  name: "MAXLAND BERHAD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "434",
  name: "MAYBULK BERHAD",
  greenScore: 75,
  category: "TRANSPORTATION & LOGISTICS"
},
{
  id: "435",
  name: "MAYU GLOBAL GROUP BERHAD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "436",
  name: "MBM RESOURCES BHD",
  greenScore: 75,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "437",
  name: "MBSB BERHAD",
  greenScore: 75,
  category: "FINANCIAL SERVICES"
},
{
  id: "438",
  name: "MCE HOLDINGS BERHAD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "439",
  name: "MEDIA CHINESE INTERNATIONAL LIMITED",
  greenScore: 100,
  category: "TELECOMMUNICATIONS & MEDIA"
},
{
  id: "440",
  name: "MEDIA PRIMA BHD",
  greenScore: 75,
  category: "TELECOMMUNICATIONS & MEDIA"
},
{
  id: "441",
  name: "MEGA FIRST CORPORATION BHD",
  greenScore: 75,
  category: "UTILITIES"
},
{
  id: "442",
  name: "MELATI EHSAN HOLDINGS BHD",
  greenScore: 50,
  category: "CONSTRUCTION"
},
{
  id: "443",
  name: "MELEWAR INDUSTRIAL GROUP BHD",
  greenScore: 75,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "444",
  name: "MENANG CORPORATION (M) BHD",
  greenScore: 50,
  category: "PROPERTY"
},
{
  id: "445",
  name: "MENTIGA CORPORATION BHD",
  greenScore: 50,
  category: "PLANTATION"
},
{
  id: "446",
  name: "MERCURY INDUSTRIES BHD",
  greenScore: 50,
  category: "CONSTRUCTION"
},
{
  id: "447",
  name: "MERIDIAN BERHAD",
  greenScore: 25,
  category: "PROPERTY"
},
{
  id: "448",
  name: "MESINIAGA BHD",
  greenScore: 75,
  category: "TECHNOLOGY"
},
{
  id: "449",
  name: "MESTRON HOLDINGS BERHAD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "450",
  name: "META BRIGHT GROUP BERHAD",
  greenScore: 50,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "451",
  name: "METROD HOLDINGS BERHAD",
  greenScore: 75,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "452",
  name: "METRONIC GLOBAL BHD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "453",
  name: "MGB BERHAD",
  greenScore: 100,
  category: "CONSTRUCTION"
},
{
  id: "454",
  name: "MHC PLANTATIONS BHD",
  greenScore: 50,
  category: "PLANTATION"
},
{
  id: "455",
  name: "MI TECHNOVATION BERHAD",
  greenScore: 75,
  category: "TECHNOLOGY"
},
{
  id: "456",
  name: "MICROLINK SOLUTIONS BHD",
  greenScore: 75,
  category: "TECHNOLOGY"
},
{
  id: "457",
  name: "MIECO CHIPBOARD BHD",
  greenScore: 75,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "458",
  name: "MILUX CORPORATION BHD",
  greenScore: 50,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "459",
  name: "MINHO (M) BHD",
  greenScore: 25,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "460",
  name: "MISC BHD",
  greenScore: 100,
  category: "TRANSPORTATION & LOGISTICS"
},
{
  id: "461",
  name: "MITRAJAYA HOLDINGS BHD",
  greenScore: 50,
  category: "CONSTRUCTION"
},
{
  id: "462",
  name: "MK LAND HOLDINGS BHD",
  greenScore: 50,
  category: "PROPERTY"
},
{
  id: "463",
  name: "MKH BERHAD",
  greenScore: 50,
  category: "PROPERTY"
},
{
  id: "464",
  name: "MKH OIL PALM (EAST KALIMANTAN) BERHAD",
  greenScore: 50,
  category: "PLANTATION"
},
{
  id: "465",
  name: "MMM GROUP BERHAD",
  greenScore: 75,
  category: "TELECOMMUNICATIONS & MEDIA"
},
{
  id: "466",
  name: "MMS VENTURES BHD",
  greenScore: 50,
  category: "TECHNOLOGY"
},
{
  id: "467",
  name: "MNRB HOLDINGS BHD",
  greenScore: 75,
  category: "FINANCIAL SERVICES"
},
{
  id: "468",
  name: "MOBILIA HOLDINGS BERHAD",
  greenScore: 75,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "469",
  name: "MPIRE GLOBAL BERHAD",
  greenScore: 50,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "470",
  name: "MR D.I.Y. GROUP (M) BERHAD",
  greenScore: 75,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "471",
  name: "MSM MALAYSIA HOLDINGS BERHAD",
  greenScore: 75,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "472",
  name: "MST GOLF GROUP BERHAD",
  greenScore: 75,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "473",
  name: "MUAR BAN LEE GROUP BERHAD",
  greenScore: 75,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "474",
  name: "MUDA HOLDINGS BHD",
  greenScore: 75,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "475",
  name: "MUDAJAYA GROUP BHD",
  greenScore: 50,
  category: "CONSTRUCTION"
},
{
  id: "476",
  name: "MUHIBBAH ENGINEERING (M) BHD",
  greenScore: 50,
  category: "CONSTRUCTION"
},
{
  id: "477",
  name: "MUI PROPERTIES BHD",
  greenScore: 50,
  category: "PROPERTY"
},
{
  id: "478",
  name: "MULPHA INTERNATIONAL BHD",
  greenScore: 50,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "479",
  name: "MULTI-USAGE HOLDINGS BHD",
  greenScore: 50,
  category: "PROPERTY"
},
{
  id: "480",
  name: "MY E.G. SERVICES BHD",
  greenScore: 100,
  category: "TECHNOLOGY"
},
{
  id: "481",
  name: "MYCRON STEEL BHD",
  greenScore: 75,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "482",
  name: "MYNEWS HOLDINGS BERHAD",
  greenScore: 50,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "483",
  name: "MYTECH GROUP BERHAD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "484",
  name: "NAIM HOLDINGS BHD",
  greenScore: 50,
  category: "PROPERTY"
},
{
  id: "485",
  name: "NATIONGATE HOLDINGS BERHAD",
  greenScore: 75,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "486",
  name: "NCT ALLIANCE BERHAD",
  greenScore: 75,
  category: "PROPERTY"
},
{
  id: "487",
  name: "NEGRI SEMBILAN OIL PALMS BHD",
  greenScore: 50,
  category: "PLANTATION"
},
{
  id: "488",
  name: "NESTLE (M) BHD",
  greenScore: 100,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "489",
  name: "NEW HOONG FATT HOLDINGS BHD",
  greenScore: 50,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "490",
  name: "NEXG BERHAD",
  greenScore: 75,
  category: "TECHNOLOGY"
},
{
  id: "491",
  name: "NEXTGREEN GLOBAL BERHAD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "492",
  name: "NI HSIN GROUP BERHAD",
  greenScore: 50,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "493",
  name: "NICHE CAPITAL EMAS HLDG BHD",
  greenScore: 50,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "494",
  name: "NOTION VTEC BHD",
  greenScore: 75,
  category: "TECHNOLOGY"
},
{
  id: "495",
  name: "NOVA WELLNESS GROUP BERHAD",
  greenScore: 50,
  category: "HEALTH CARE"
},
{
  id: "496",
  name: "NPC RESOURCES BHD",
  greenScore: 50,
  category: "PLANTATION"
},
{
  id: "497",
  name: "NTPM HOLDINGS BHD",
  greenScore: 75,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "498",
  name: "NUENERGY HOLDINGS BERHAD",
  greenScore: 75,
  category: "ENERGY"
},
{
  id: "499",
  name: "OASIS HARVEST CORPORATION BERHAD",
  greenScore: 50,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "500",
  name: "OCB BHD",
  greenScore: 50,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "501",
  name: "OCEANCASH PACIFIC BHD",
  greenScore: 75,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "502",
  name: "OCK GROUP BERHAD",
  greenScore: 75,
  category: "TELECOMMUNICATIONS & MEDIA"
},
{
  id: "503",
  name: "OCR GROUP BERHAD",
  greenScore: 50,
  category: "CONSTRUCTION"
},
{
  id: "504",
  name: "OKA CORPORATION BHD",
  greenScore: 25,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "505",
  name: "OLYMPIA INDUSTRIES BHD",
  greenScore: 75,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "506",
  name: "OM HOLDINGS LIMITED",
  greenScore: 100,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "507",
  name: "OMESTI BHD",
  greenScore: 75,
  category: "TECHNOLOGY"
},
{
  id: "508",
  name: "ONE GLOVE GROUP BERHAD",
  greenScore: 75,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "509",
  name: "ONLY WORLD GROUP HOLDINGS BERHAD",
  greenScore: 50,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "510",
  name: "OPENSYS (M) BHD",
  greenScore: 50,
  category: "TECHNOLOGY"
},
{
  id: "511",
  name: "OPTIMAX HOLDINGS BERHAD",
  greenScore: 75,
  category: "HEALTH CARE"
},
{
  id: "512",
  name: "ORIENTAL FOOD INDUSTRIES HLDG",
  greenScore: 50,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "513",
  name: "ORIENTAL HOLDINGS BHD",
  greenScore: 50,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "514",
  name: "ORIENTAL INTEREST BHD",
  greenScore: 50,
  category: "PROPERTY"
},
{
  id: "515",
  name: "ORNAPAPER BHD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "516",
  name: "OSK HOLDINGS BHD",
  greenScore: 75,
  category: "PROPERTY"
},
{
  id: "517",
  name: "P.A. RESOURCES BHD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "518",
  name: "P.I.E. INDUSTRIAL BHD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "519",
  name: "PACIFIC & ORIENT BHD",
  greenScore: 50,
  category: "FINANCIAL SERVICES"
},
{
  id: "520",
  name: "PADINI HOLDINGS BHD",
  greenScore: 75,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "521",
  name: "PAN MALAYSIA CORPORATION BHD",
  greenScore: 50,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "522",
  name: "PANASONIC MANUFACTURING MSIA",
  greenScore: 75,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "523",
  name: "PANSAR BERHAD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "524",
  name: "PANTECH GROUP HOLDINGS BHD",
  greenScore: 75,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "525",
  name: "PAOS HOLDINGS BHD",
  greenScore: 50,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "526",
  name: "PAPPAJACK BERHAD",
  greenScore: 50,
  category: "FINANCIAL SERVICES"
},
{
  id: "527",
  name: "PARAGON GLOBE BERHAD",
  greenScore: 75,
  category: "PROPERTY"
},
{
  id: "528",
  name: "PARAGON UNION BHD",
  greenScore: 50,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "529",
  name: "PARAMOUNT CORPORATION BHD",
  greenScore: 75,
  category: "PROPERTY"
},
{
  id: "530",
  name: "PARKSON HOLDINGS BHD",
  greenScore: 50,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "531",
  name: "PARKWOOD HOLDINGS BERHAD",
  greenScore: 50,
  category: "PROPERTY"
},
{
  id: "532",
  name: "PASDEC HOLDINGS BHD",
  greenScore: 50,
  category: "PROPERTY"
},
{
  id: "533",
  name: "PAVILION REAL ESTATE INV TRUST",
  greenScore: 75,
  category: "REAL ESTATE INVESTMENT TRUSTS"
},
{
  id: "534",
  name: "PBA HOLDINGS BHD",
  greenScore: 50,
  category: "UTILITIES"
},
{
  id: "535",
  name: "PBS BERHAD",
  greenScore: 50,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "536",
  name: "PCCS GROUP BHD",
  greenScore: 50,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "537",
  name: "PDZ HOLDINGS BHD",
  greenScore: 50,
  category: "TRANSPORTATION & LOGISTICS"
},
{
  id: "538",
  name: "PECCA GROUP BERHAD",
  greenScore: 75,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "539",
  name: "PEGASUS HEIGHTS BERHAD",
  greenScore: 50,
  category: "PROPERTY"
},
{
  id: "540",
  name: "PENSONIC HOLDINGS BHD",
  greenScore: 25,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "541",
  name: "PENTAMASTER CORPORATION BHD",
  greenScore: 75,
  category: "TECHNOLOGY"
},
{
  id: "542",
  name: "PERAK CORPORATION BHD",
  greenScore: 75,
  category: "TRANSPORTATION & LOGISTICS"
},
{
  id: "543",
  name: "PERAK TRANSIT BERHAD",
  greenScore: 75,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "544",
  name: "PERDANA PETROLEUM BERHAD",
  greenScore: 50,
  category: "ENERGY"
},
{
  id: "545",
  name: "PERMAJU INDUSTRIES BHD",
  greenScore: 50,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "546",
  name: "PERTAMA DIGITAL BERHAD",
  greenScore: 50,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "547",
  name: "PESONA METRO HOLDINGS BHD",
  greenScore: 75,
  category: "CONSTRUCTION"
},
{
  id: "548",
  name: "PESTEC INTERNATIONAL BERHAD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "549",
  name: "PETRA ENERGY BHD",
  greenScore: 75,
  category: "ENERGY"
},
{
  id: "550",
  name: "PETRON MALAYSIA REFINING & MARKETING BERHAD",
  greenScore: 75,
  category: "ENERGY"
},
{
  id: "551",
  name: "PETRONAS CHEMICALS GROUP BHD",
  greenScore: 100,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "552",
  name: "PETRONAS DAGANGAN BHD",
  greenScore: 100,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "553",
  name: "PETRONAS GAS BHD",
  greenScore: 100,
  category: "UTILITIES"
},
{
  id: "554",
  name: "PGF CAPITAL BERHAD",
  greenScore: 75,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "555",
  name: "PHARMANIAGA BHD",
  greenScore: 100,
  category: "HEALTH CARE"
},
{
  id: "556",
  name: "PIMPINAN EHSAN BERHAD",
  greenScore: 50,
  category: "CONSTRUCTION"
},
{
  id: "557",
  name: "PINEHILL PACIFIC BERHAD",
  greenScore: 50,
  category: "PLANTATION"
},
{
  id: "558",
  name: "PINTARAS JAYA BHD",
  greenScore: 50,
  category: "CONSTRUCTION"
},
{
  id: "559",
  name: "PJBUMI BHD",
  greenScore: 75,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "560",
  name: "PLB ENGINEERING BHD",
  greenScore: 50,
  category: "PROPERTY"
},
{
  id: "561",
  name: "PLENITUDE BHD",
  greenScore: 75,
  category: "PROPERTY"
},
{
  id: "562",
  name: "PLS PLANTATIONS BERHAD",
  greenScore: 75,
  category: "PLANTATION"
},
{
  id: "563",
  name: "PMB TECHNOLOGY BHD",
  greenScore: 75,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "564",
  name: "PNE PCB BHD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "565",
  name: "POH HUAT RESOURCES HOLDINGS",
  greenScore: 75,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "566",
  name: "POH KONG HOLDINGS BHD",
  greenScore: 50,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "567",
  name: "POS MALAYSIA BHD",
  greenScore: 100,
  category: "TRANSPORTATION & LOGISTICS"
},
{
  id: "568",
  name: "POWER ROOT BERHAD",
  greenScore: 50,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "569",
  name: "PPB GROUP BHD",
  greenScore: 75,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "570",
  name: "PRESS METAL ALUMINIUM HOLDINGS BERHAD",
  greenScore: 100,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "571",
  name: "PRESTAR RESOURCES BHD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "572",
  name: "PRG HOLDINGS BERHAD",
  greenScore: 50,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "573",
  name: "PROGRESSIVE IMPACT CORPORATION",
  greenScore: 75,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "574",
  name: "PROPEL GLOBAL BERHAD",
  greenScore: 75,
  category: "ENERGY"
},
{
  id: "575",
  name: "PROTASCO BHD",
  greenScore: 75,
  category: "CONSTRUCTION"
},
{
  id: "576",
  name: "PSAHAAN SADUR TIMAH MSIA",
  greenScore: 75,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "577",
  name: "PTT SYNERGY GROUP BERHAD",
  greenScore: 50,
  category: "PROPERTY"
},
{
  id: "578",
  name: "PUBLIC BANK BHD",
  greenScore: 100,
  category: "FINANCIAL SERVICES"
},
{
  id: "579",
  name: "PUBLIC PACKAGES HOLDINGS BHD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "580",
  name: "PUNCAK NIAGA HOLDINGS BHD",
  greenScore: 50,
  category: "CONSTRUCTION"
},
{
  id: "581",
  name: "PWF CORPORATION BERHAD",
  greenScore: 50,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "582",
  name: "QES GROUP BERHAD",
  greenScore: 75,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "583",
  name: "QL RESOURCES BHD",
  greenScore: 75,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "584",
  name: "QUALITY CONCRETE HOLDINGS BHD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "585",
  name: "RADIUM DEVELOPMENT BERHAD",
  greenScore: 75,
  category: "PROPERTY"
},
{
  id: "586",
  name: "RALCO CORPORATION BHD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "587",
  name: "RANHILL UTILITIES BERHAD",
  greenScore: 75,
  category: "UTILITIES"
},
{
  id: "588",
  name: "RAPID SYNERGY BHD",
  greenScore: 50,
  category: "PROPERTY"
},
{
  id: "589",
  name: "RCE CAPITAL BHD",
  greenScore: 100,
  category: "FINANCIAL SERVICES"
},
{
  id: "590",
  name: "REDTONE DIGITAL BERHAD",
  greenScore: 75,
  category: "TELECOMMUNICATIONS & MEDIA"
},
{
  id: "591",
  name: "RENEUCO BERHAD",
  greenScore: 50,
  category: "ENERGY"
},
{
  id: "592",
  name: "RESERVOIR LINK ENERGY BHD",
  greenScore: 75,
  category: "ENERGY"
},
{
  id: "593",
  name: "RESINTECH BHD",
  greenScore: 75,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "594",
  name: "REVENUE GROUP BERHAD",
  greenScore: 75,
  category: "TECHNOLOGY"
},
{
  id: "595",
  name: "REX INDUSTRY BHD",
  greenScore: 50,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "596",
  name: "RGB INTERNATIONAL BHD",
  greenScore: 75,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "597",
  name: "RGT BERHAD",
  greenScore: 75,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "598",
  name: "RHB BANK BERHAD",
  greenScore: 100,
  category: "FINANCIAL SERVICES"
},
{
  id: "599",
  name: "RHONE MA HOLDINGS BERHAD",
  greenScore: 75,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "600",
  name: "RHONG KHEN INTERNATIONAL BERHAD",
  greenScore: 75,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "601",
  name: "RIMBUNAN SAWIT BHD",
  greenScore: 50,
  category: "PLANTATION"
},
{
  id: "602",
  name: "RIVERVIEW RUBBER ESTATES BHD",
  greenScore: 50,
  category: "PLANTATION"
},
{
  id: "603",
  name: "ROHAS TECNIC BERHAD",
  greenScore: 100,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "604",
  name: "S & F CAPITAL BERHAD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "605",
  name: "SALCON BHD",
  greenScore: 75,
  category: "UTILITIES"
},
{
  id: "606",
  name: "SALUTICA BERHAD",
  greenScore: 50,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "607",
  name: "SAM ENGINEERING & EQUIPMENT",
  greenScore: 75,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "608",
  name: "SAMAIDEN GROUP BERHAD",
  greenScore: 75,
  category: "ENERGY"
},
{
  id: "609",
  name: "SAMCHEM HOLDINGS BERHAD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "610",
  name: "SAPURA ENERGY BERHAD",
  greenScore: 50,
  category: "ENERGY"
},
{
  id: "611",
  name: "SAPURA INDUSTRIAL BHD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "612",
  name: "SAPURA RESOURCES BHD",
  greenScore: 50,
  category: "PROPERTY"
},
{
  id: "613",
  name: "SARAWAK CABLE BERHAD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "614",
  name: "SARAWAK CONSOLIDATED IND BHD",
  greenScore: 75,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "615",
  name: "SARAWAK OIL PALMS BHD",
  greenScore: 75,
  category: "PLANTATION"
},
{
  id: "616",
  name: "SARAWAK PLANTATION BHD",
  greenScore: 50,
  category: "PLANTATION"
},
{
  id: "617",
  name: "SASBADI HOLDINGS BHD",
  greenScore: 75,
  category: "TELECOMMUNICATIONS & MEDIA"
},
{
  id: "618",
  name: "SAUDIGOLD GROUP BERHAD",
  greenScore: 50,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "619",
  name: "SBC CORPORATION BHD",
  greenScore: 50,
  category: "PROPERTY"
},
{
  id: "620",
  name: "SCANWOLF CORPORATION BHD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "621",
  name: "SCGM BHD",
  greenScore: 75,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "622",
  name: "SCICOM (MSC) BHD",
  greenScore: 75,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "623",
  name: "SCIENTEX BERHAD",
  greenScore: 100,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "624",
  name: "SCIENTEX PACKAGING (AYER KEROH) BERHAD",
  greenScore: 75,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "625",
  name: "SD GUTHRIE BERHAD",
  greenScore: 75,
  category: "PLANTATION"
},
{
  id: "626",
  name: "SDS GROUP BERHAD",
  greenScore: 50,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "627",
  name: "SEACERA GROUP BERHAD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "628",
  name: "SEAL INCORPORATED BHD",
  greenScore: 75,
  category: "PROPERTY"
},
{
  id: "629",
  name: "SEALINK INTERNATIONAL BHD",
  greenScore: 75,
  category: "TRANSPORTATION & LOGISTICS"
},
{
  id: "630",
  name: "SEE HUP CONSOLIDATED BHD",
  greenScore: 75,
  category: "TRANSPORTATION & LOGISTICS"
},
{
  id: "631",
  name: "SEG INTERNATIONAL BHD",
  greenScore: 75,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "632",
  name: "SELANGOR DREDGING BHD",
  greenScore: 50,
  category: "PROPERTY"
},
{
  id: "633",
  name: "SENG FONG HOLDINGS BERHAD",
  greenScore: 75,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "634",
  name: "SENHENG NEW RETAIL BERHAD",
  greenScore: 50,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "635",
  name: "SENI JAYA CORPORATION BHD",
  greenScore: 75,
  category: "TELECOMMUNICATIONS & MEDIA"
},
{
  id: "636",
  name: "SENTORIA GROUP BERHAD",
  greenScore: 25,
  category: "PROPERTY"
},
{
  id: "637",
  name: "SENTRAL REIT",
  greenScore: 75,
  category: "REAL ESTATE INVESTMENT TRUSTS"
},
{
  id: "638",
  name: "SEREMBAN ENGINEERING BERHAD",
  greenScore: 75,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "639",
  name: "SERN KOU RESOURCES BHD",
  greenScore: 50,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "640",
  name: "SHANGRI-LA HOTELS (M) BHD",
  greenScore: 75,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "641",
  name: "SHH RESOURCES HOLDINGS BHD",
  greenScore: 75,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "642",
  name: "SHIN YANG GROUP BERHAD",
  greenScore: 50,
  category: "TRANSPORTATION & LOGISTICS"
},
{
  id: "643",
  name: "SHL CONSOLIDATED BHD",
  greenScore: 50,
  category: "PROPERTY"
},
{
  id: "644",
  name: "SIGNATURE INTERNATIONAL BHD",
  greenScore: 50,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "645",
  name: "SIME DARBY BHD",
  greenScore: 75,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "646",
  name: "SIME DARBY PROPERTY BERHAD",
  greenScore: 75,
  category: "PROPERTY"
},
{
  id: "647",
  name: "SIN HENG CHAN (MALAYA) BHD",
  greenScore: 50,
  category: "PLANTATION"
},
{
  id: "648",
  name: "SINARAN ADVANCE GROUP BERHAD",
  greenScore: 50,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "649",
  name: "SINMAH CAPITAL BERHAD",
  greenScore: 50,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "650",
  name: "SKB SHUTTERS CORPORATION BHD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "651",
  name: "SKP RESOURCES BHD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "652",
  name: "SKYGATE SOLUTIONS BERHAD",
  greenScore: 50,
  category: "PROPERTY"
},
{
  id: "653",
  name: "SKYWORLD DEVELOPMENT BERHAD",
  greenScore: 100,
  category: "PROPERTY"
},
{
  id: "654",
  name: "SLP RESOURCES BHD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "655",
  name: "SMIS CORPORATION BHD",
  greenScore: 75,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "656",
  name: "SNS NETWORK TECHNOLOGY BERHAD",
  greenScore: 50,
  category: "TECHNOLOGY"
},
{
  id: "657",
  name: "SOLARVEST HOLDINGS BERHAD",
  greenScore: 75,
  category: "ENERGY"
},
{
  id: "658",
  name: "SOLID AUTOMOTIVE BHD",
  greenScore: 50,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "659",
  name: "SOUTH MALAYSIA INDUSTRIES BHD",
  greenScore: 50,
  category: "PROPERTY"
},
{
  id: "660",
  name: "SOUTHERN ACIDS (M) BHD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "661",
  name: "SOUTHERN CABLE GROUP BERHAD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "662",
  name: "SOUTHERN STEEL BHD",
  greenScore: 100,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "663",
  name: "SP SETIA BHD",
  greenScore: 75,
  category: "PROPERTY"
},
{
  id: "664",
  name: "SPORTS TOTO BERHAD",
  greenScore: 100,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "665",
  name: "SPRITZER BHD",
  greenScore: 75,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "666",
  name: "STAR MEDIA GROUP BERHAD",
  greenScore: 75,
  category: "TELECOMMUNICATIONS & MEDIA"
},
{
  id: "667",
  name: "SUBUR TIASA HOLDINGS BHD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "668",
  name: "SUCCESS TRANSFORMER CORP BHD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "669",
  name: "SUNGEI BAGAN RUBBER CO (M) BHD",
  greenScore: 50,
  category: "PLANTATION"
},
{
  id: "670",
  name: "SUNSURIA BERHAD",
  greenScore: 75,
  category: "PROPERTY"
},
{
  id: "671",
  name: "SUNWAY BERHAD",
  greenScore: 100,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "672",
  name: "SUNWAY CONSTRUCTION GROUP BERHAD",
  greenScore: 75,
  category: "CONSTRUCTION"
},
{
  id: "673",
  name: "SUNWAY REAL ESTATE INVT TRUST",
  greenScore: 100,
  category: "REAL ESTATE INVESTMENT TRUSTS"
},
{
  id: "674",
  name: "SUPERCOMNET TECHNOLOGIES BHD",
  greenScore: 75,
  category: "HEALTH CARE"
},
{
  id: "675",
  name: "SUPERLON HOLDINGS BHD",
  greenScore: 75,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "676",
  name: "SUPERMAX CORPORATION BHD",
  greenScore: 75,
  category: "HEALTH CARE"
},
{
  id: "677",
  name: "SURIA CAPITAL HOLDINGS BHD",
  greenScore: 75,
  category: "TRANSPORTATION & LOGISTICS"
},
{
  id: "678",
  name: "SWIFT HAULAGE BERHAD",
  greenScore: 75,
  category: "TRANSPORTATION & LOGISTICS"
},
{
  id: "679",
  name: "SWS CAPITAL BERHAD",
  greenScore: 50,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "680",
  name: "SYARIKAT TAKAFUL MALAYSIA KELUARGA BERHAD",
  greenScore: 75,
  category: "FINANCIAL SERVICES"
},
{
  id: "681",
  name: "SYCAL VENTURES BHD",
  greenScore: 25,
  category: "CONSTRUCTION"
},
{
  id: "682",
  name: "SYMPHONY LIFE BERHAD",
  greenScore: 50,
  category: "PROPERTY"
},
{
  id: "683",
  name: "T7 GLOBAL BERHAD",
  greenScore: 75,
  category: "ENERGY"
},
{
  id: "684",
  name: "TA ANN HOLDINGS BHD",
  greenScore: 50,
  category: "PLANTATION"
},
{
  id: "685",
  name: "TA WIN HOLDINGS BHD",
  greenScore: 75,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "686",
  name: "TAFI INDUSTRIES BHD",
  greenScore: 75,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "687",
  name: "TALAM TRANSFORM BERHAD",
  greenScore: 50,
  category: "PROPERTY"
},
{
  id: "688",
  name: "TALIWORKS CORPORATION BHD",
  greenScore: 75,
  category: "UTILITIES"
},
{
  id: "689",
  name: "TAMBUN INDAH LAND BERHAD",
  greenScore: 75,
  category: "PROPERTY"
},
{
  id: "690",
  name: "TAN CHONG MOTOR HOLDINGS BHD",
  greenScore: 75,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "691",
  name: "TANCO HOLDINGS BHD",
  greenScore: 50,
  category: "PROPERTY"
},
{
  id: "692",
  name: "TAS OFFSHORE BERHAD",
  greenScore: 75,
  category: "TRANSPORTATION & LOGISTICS"
},
{
  id: "693",
  name: "TASCO BERHAD",
  greenScore: 75,
  category: "TRANSPORTATION & LOGISTICS"
},
{
  id: "694",
  name: "TDM BHD",
  greenScore: 75,
  category: "PLANTATION"
},
{
  id: "695",
  name: "TECHBASE INDUSTRIES BERHAD",
  greenScore: 50,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "696",
  name: "TECHBOND GROUP BERHAD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "697",
  name: "TECHNA-X BERHAD",
  greenScore: 50,
  category: "ENERGY"
},
{
  id: "698",
  name: "TECK GUAN PERDANA BHD",
  greenScore: 50,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "699",
  name: "TEK SENG HOLDINGS BHD",
  greenScore: 75,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "700",
  name: "TELADAN GROUP BERHAD",
  greenScore: 50,
  category: "PROPERTY"
},
{
  id: "701",
  name: "TELEKOM MALAYSIA BHD",
  greenScore: 100,
  category: "TELECOMMUNICATIONS & MEDIA"
},
{
  id: "702",
  name: "TENAGA NASIONAL BHD",
  greenScore: 75,
  category: "UTILITIES"
},
{
  id: "703",
  name: "TEO GUAN LEE CORPORATION BHD",
  greenScore: 50,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "704",
  name: "TEO SENG CAPITAL BHD",
  greenScore: 50,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "705",
  name: "TEXCHEM RESOURCES BHD",
  greenScore: 75,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "706",
  name: "TH PLANTATIONS BHD",
  greenScore: 75,
  category: "PLANTATION"
},
{
  id: "707",
  name: "THETA EDGE BERHAD",
  greenScore: 50,
  category: "TECHNOLOGY"
},
{
  id: "708",
  name: "THONG GUAN INDUSTRIES BHD",
  greenScore: 75,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "709",
  name: "THREE-A RESOURCES BHD",
  greenScore: 50,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "710",
  name: "THRIVEN GLOBAL BERHAD",
  greenScore: 50,
  category: "PROPERTY"
},
{
  id: "711",
  name: "TIEN WAH PRESS HOLDINGS BHD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "712",
  name: "TIMBERWELL BHD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "713",
  name: "TIME DOTCOM BHD",
  greenScore: 75,
  category: "TELECOMMUNICATIONS & MEDIA"
},
{
  id: "714",
  name: "TIONG NAM LOGISTICS HOLDINGS",
  greenScore: 50,
  category: "TRANSPORTATION & LOGISTICS"
},
{
  id: "715",
  name: "TITIJAYA LAND BERHAD",
  greenScore: 50,
  category: "PROPERTY"
},
{
  id: "716",
  name: "TMC LIFE SCIENCES BHD",
  greenScore: 75,
  category: "HEALTH CARE"
},
{
  id: "717",
  name: "TOMEI CONSOLIDATED BHD",
  greenScore: 50,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "718",
  name: "TOMYPAK HOLDINGS BHD",
  greenScore: 75,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "719",
  name: "TONG HERR RESOURCES BHD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "720",
  name: "TOP GLOVE CORPORATION BHD",
  greenScore: 100,
  category: "HEALTH CARE"
},
{
  id: "721",
  name: "TOWER REITS",
  greenScore: 50,
  category: "REAL ESTATE INVESTMENT TRUSTS"
},
{
  id: "722",
  name: "TOYO VENTURES HOLDINGS BERHAD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "723",
  name: "TPC PLUS BHD",
  greenScore: 50,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "724",
  name: "TRC SYNERGY BHD",
  greenScore: 50,
  category: "CONSTRUCTION"
},
{
  id: "725",
  name: "TRIVE PROPERTY GROUP BERHAD",
  greenScore: 50,
  category: "ENERGY"
},
{
  id: "726",
  name: "TROPICANA CORPORATION BERHAD",
  greenScore: 50,
  category: "PROPERTY"
},
{
  id: "727",
  name: "TSH RESOURCES BHD",
  greenScore: 75,
  category: "PLANTATION"
},
{
  id: "728",
  name: "TSR CAPITAL BHD",
  greenScore: 50,
  category: "CONSTRUCTION"
},
{
  id: "729",
  name: "TUJU SETIA BERHAD",
  greenScore: 50,
  category: "CONSTRUCTION"
},
{
  id: "730",
  name: "TUNE PROTECT GROUP BERHAD",
  greenScore: 100,
  category: "FINANCIAL SERVICES"
},
{
  id: "731",
  name: "TURBO-MECH BERHAD",
  greenScore: 75,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "732",
  name: "TURIYA BHD",
  greenScore: 50,
  category: "TECHNOLOGY"
},
{
  id: "733",
  name: "TWL HOLDINGS BERHAD",
  greenScore: 50,
  category: "PROPERTY"
},
{
  id: "734",
  name: "TXCD BERHAD",
  greenScore: 50,
  category: "CONSTRUCTION"
},
{
  id: "735",
  name: "UCHI TECHNOLOGIES BHD",
  greenScore: 75,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "736",
  name: "UEM EDGENTA BERHAD",
  greenScore: 75,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "737",
  name: "UEM SUNRISE BERHAD",
  greenScore: 75,
  category: "PROPERTY"
},
{
  id: "738",
  name: "UMEDIC GROUP BERHAD",
  greenScore: 75,
  category: "HEALTH CARE"
},
{
  id: "739",
  name: "UMS HOLDINGS BHD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "740",
  name: "UMS-NEIKEN GROUP BHD",
  greenScore: 75,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "741",
  name: "UNIMECH GROUP BHD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "742",
  name: "UNISEM (M) BHD",
  greenScore: 100,
  category: "TECHNOLOGY"
},
{
  id: "743",
  name: "UNITED MALACCA BHD",
  greenScore: 50,
  category: "PLANTATION"
},
{
  id: "744",
  name: "UNITED PLANTATIONS BHD",
  greenScore: 75,
  category: "PLANTATION"
},
{
  id: "745",
  name: "UNITED U-LI CORPORATION BHD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "746",
  name: "UOA DEVELOPMENT BERHAD",
  greenScore: 75,
  category: "PROPERTY"
},
{
  id: "747",
  name: "UOA REITS",
  greenScore: 50,
  category: "REAL ESTATE INVESTMENT TRUSTS"
},
{
  id: "748",
  name: "UPA CORPORATION BHD",
  greenScore: 50,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "749",
  name: "UWC BERHAD",
  greenScore: 100,
  category: "TECHNOLOGY"
},
{
  id: "750",
  name: "UZMA BHD",
  greenScore: 75,
  category: "ENERGY"
},
{
  id: "751",
  name: "V.S INDUSTRY BHD",
  greenScore: 100,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "752",
  name: "VARIA BERHAD",
  greenScore: 50,
  category: "CONSTRUCTION"
},
{
  id: "753",
  name: "VELESTO ENERGY BERHAD",
  greenScore: 100,
  category: "ENERGY"
},
{
  id: "754",
  name: "VELOCITY CAPITAL PARTNER BERHAD",
  greenScore: 75,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "755",
  name: "VERSATILE CREATIVE BHD",
  greenScore: 50,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "756",
  name: "VITROX CORPORATION BHD",
  greenScore: 100,
  category: "TECHNOLOGY"
},
{
  id: "757",
  name: "VIZIONE HOLDINGS BERHAD",
  greenScore: 50,
  category: "CONSTRUCTION"
},
{
  id: "758",
  name: "VSTECS BERHAD",
  greenScore: 75,
  category: "TECHNOLOGY"
},
{
  id: "759",
  name: "WANG-ZHENG BHD",
  greenScore: 50,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "760",
  name: "WARISAN TC HOLDINGS BHD",
  greenScore: 75,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "761",
  name: "WASCO BERHAD",
  greenScore: 100,
  category: "ENERGY"
},
{
  id: "762",
  name: "WATTA HOLDING BHD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "763",
  name: "WCE HOLDINGS BERHAD",
  greenScore: 75,
  category: "CONSTRUCTION"
},
{
  id: "764",
  name: "WCT HOLDINGS BERHAD",
  greenScore: 100,
  category: "CONSTRUCTION"
},
{
  id: "765",
  name: "WEGMANS HOLDINGS BERHAD",
  greenScore: 50,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "766",
  name: "WELLCALL HOLDINGS BHD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "767",
  name: "WESTPORTS HOLDINGS BERHAD",
  greenScore: 100,
  category: "TRANSPORTATION & LOGISTICS"
},
{
  id: "768",
  name: "WHITE HORSE BHD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "769",
  name: "WILLOWGLEN MSC BHD",
  greenScore: 50,
  category: "TECHNOLOGY"
},
{
  id: "770",
  name: "WMG HOLDINGS BERHAD",
  greenScore: 50,
  category: "PROPERTY"
},
{
  id: "771",
  name: "WONG ENGINEERING CORPORATION",
  greenScore: 75,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "772",
  name: "WOODLANDOR HOLDINGS BHD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "773",
  name: "WTK HOLDINGS BHD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "774",
  name: "XIDELANG HOLDINGS LTD",
  greenScore: 50,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "775",
  name: "XIN HWA HOLDINGS BERHAD",
  greenScore: 50,
  category: "TRANSPORTATION & LOGISTICS"
},
{
  id: "776",
  name: "XIN SYNERGY GROUP BERHAD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "777",
  name: "XL HOLDINGS BERHAD",
  greenScore: 50,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "778",
  name: "Y&G CORPORATION BHD",
  greenScore: 50,
  category: "PROPERTY"
},
{
  id: "779",
  name: "Y.S.P.SOUTHEAST ASIA HOLDING",
  greenScore: 75,
  category: "HEALTH CARE"
},
{
  id: "780",
  name: "YB VENTURES BERHAD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "781",
  name: "YENHER HOLDINGS BERHAD",
  greenScore: 50,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "782",
  name: "YINSON HOLDINGS BHD",
  greenScore: 100,
  category: "ENERGY"
},
{
  id: "783",
  name: "YLI HOLDINGS BHD",
  greenScore: 50,
  category: "INDUSTRIAL PRODUCTS & SERVICES"
},
{
  id: "784",
  name: "YNH PROPERTY BHD",
  greenScore: 50,
  category: "PROPERTY"
},
{
  id: "785",
  name: "YONG TAI BHD",
  greenScore: 50,
  category: "PROPERTY"
},
{
  id: "786",
  name: "YOONG ONN CORPORATION BERHAD",
  greenScore: 50,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "787",
  name: "YTL CORPORATION BHD",
  greenScore: 100,
  category: "UTILITIES"
},
{
  id: "788",
  name: "YTL HOSPITALITY REIT",
  greenScore: 75,
  category: "REAL ESTATE INVESTMENT TRUSTS"
},
{
  id: "789",
  name: "YTL POWER INTERNATIONAL BHD",
  greenScore: 75,
  category: "UTILITIES"
},
{
  id: "790",
  name: "YX PRECIOUS METALS BHD",
  greenScore: 50,
  category: "CONSUMER PRODUCTS & SERVICES"
},
{
  id: "791",
  name: "ZECON BHD",
  greenScore: 50,
  category: "CONSTRUCTION"
},
{
  id: "792",
  name: "ZELAN BHD",
  greenScore: 50,
  category: "CONSTRUCTION"
},
{
  id: "793",
  name: "ZHULIAN CORPORATION BHD",
  greenScore: 50,
  category: "CONSUMER PRODUCTS & SERVICES"
}]);

  const handleTransactionUpload = (data: any[]) => {
    // Process uploaded transactions
    const newTransactions = data.map((item, index) => ({
      id: `upload-${index}`,
      date: item.date,
      merchant: item.merchant,
      amount: item.amount,
      greenScore: Math.floor(Math.random() * 100), // Would be looked up from merchant DB
      ecoScoreDelta: Math.floor(Math.random() * 10) - 2,
      category: item.category
    }));
    
    setTransactions([...newTransactions, ...transactions]);
  };

  const handleMerchantUpload = (data: any[]) => {
    // Handle merchant green score uploads
    console.log("Merchant data uploaded:", data);
  };

  const stats = [
    {
      title: "Monthly EcoScore",
      value: `+${userScore.ecoScore}`,
      subtitle: `${50 - userScore.ecoScore} remaining`,
      icon: Leaf,
      color: "text-success"
    },
    {
      title: "Reset Date",
      value: "Aug 1",
      subtitle: "Next reset",
      icon: Calendar,
      color: "text-warning"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Header userName="Amir Rahman" />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-foreground">
            Welcome to EcoScore Wallet
          </h2>
          <p className="text-lg text-muted-foreground">
            Track your sustainable spending and boost your credit score with every green purchase
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Badge variant="outline" className="text-success border-success">
              🇲🇾 Malaysian Banks Supported
            </Badge>
            <Badge variant="outline" className="text-primary border-primary">
              Sandbox Environment
            </Badge>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="shadow-card hover:shadow-hover transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.subtitle}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Score & Bank */}
          <div className="space-y-6">
            <ScoreCard {...userScore} />
            <BankConnection 
              isConnected={isConnected}
              bankName="GLC Bank"
              balance={15420.50}
              lastSync={new Date()}
            />
          </div>

          {/* Middle Column - Transactions */}
          <div className="lg:col-span-2 space-y-6">
            <TransactionFeed transactions={transactions} />
            <MerchantsList merchants={merchants} />
            
            {/* CSV Upload Section */}
            <CSVUpload 
              type="transactions" 
              onUploadComplete={handleTransactionUpload}
            />
          </div>
        </div>

        {/* Call to Action */}
        <Card className="bg-gradient-eco text-primary-foreground shadow-eco">
          <CardContent className="p-8 text-center">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Ready to boost your credit score?</h3>
              <p className="text-primary-foreground/90 max-w-2xl mx-auto">
                Start spending sustainably today and watch your EcoScore grow. 
                Connect your bank account or upload your transaction history to get started.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="secondary" size="lg" className="shadow-hover">
                  Connect Bank Account
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
                <Button variant="outline" size="lg" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  Learn More
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="bg-primary/5 py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2025 EcoScore Wallet. A GLC Bank Innovation Project.</p>
          <p className="text-sm mt-2">
            Sandbox environment for testing purposes only.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
