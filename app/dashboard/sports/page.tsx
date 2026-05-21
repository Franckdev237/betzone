// app/dashboard/sports/page.tsx
'use client';

import { useState } from 'react';
import { Trophy, ChevronDown, ChevronRight } from 'lucide-react';

const SPORTS_DATA = [
  {
    emoji: '⚽',
    name: 'Football',
    leagues: [
      {
        name: 'Coupe du Monde 2026 🔥', flag: '🌍',
        clubs: ['France', 'Brésil', 'Argentine', 'Angleterre', 'Espagne', 'Allemagne', 'Portugal', 'Pays-Bas', 'Maroc', 'Sénégal', 'Cameroun', 'Nigeria', 'Côte d\'Ivoire', 'Ghana', 'Égypte', 'Afrique du Sud', 'USA', 'Mexique', 'Japon', 'Corée du Sud', 'Australie', 'Croatie', 'Belgique', 'Italie', 'Uruguay', 'Colombie', 'Équateur', 'Canada', 'Qatar', 'Arabie Saoudite', 'Iran', 'Serbie'],
      },
      {
        name: 'Ligue 1 (France)', flag: '🇫🇷',
        clubs: ['PSG', 'Olympique de Marseille', 'Olympique Lyonnais', 'AS Monaco', 'LOSC Lille', 'OGC Nice', 'Stade Rennais', 'RC Lens', 'Montpellier HSC', 'Toulouse FC', 'Stade de Reims', 'RC Strasbourg', 'FC Nantes', 'Girondins de Bordeaux', 'Saint-Étienne', 'Clermont Foot', 'FC Lorient', 'Stade Brestois', 'Angers SCO', 'Le Havre AC'],
      },
      {
        name: 'Premier League (Angleterre)', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
        clubs: ['Manchester City', 'Arsenal', 'Liverpool', 'Chelsea', 'Manchester United', 'Tottenham Hotspur', 'Newcastle United', 'Aston Villa', 'West Ham United', 'Brighton', 'Brentford', 'Fulham', 'Crystal Palace', 'Wolves', 'Everton', 'Nottingham Forest', 'Bournemouth', 'Leicester City', 'Leeds United', 'Burnley'],
      },
      {
        name: 'La Liga (Espagne)', flag: '🇪🇸',
        clubs: ['Real Madrid', 'FC Barcelona', 'Atlético Madrid', 'Séville FC', 'Real Sociedad', 'Villarreal', 'Athletic Bilbao', 'Real Betis', 'Valence CF', 'Osasuna', 'Getafe CF', 'Celta Vigo', 'Rayo Vallecano', 'Cadiz CF', 'Almeria', 'Espanyol', 'Girona FC', 'Las Palmas', 'Mallorca', 'Alaves'],
      },
      {
        name: 'Bundesliga (Allemagne)', flag: '🇩🇪',
        clubs: ['Bayern Munich', 'Borussia Dortmund', 'RB Leipzig', 'Bayer Leverkusen', 'Eintracht Frankfurt', 'Wolfsburg', 'SC Fribourg', 'Union Berlin', 'VfB Stuttgart', 'Hoffenheim', 'Borussia M\'Gladbach', 'Mainz 05', 'Cologne', 'Werder Brême', 'Hertha Berlin', 'Augsburg', 'Bochum', 'Darmstadt'],
      },
      {
        name: 'Serie A (Italie)', flag: '🇮🇹',
        clubs: ['Juventus', 'AC Milan', 'Inter Milan', 'AS Roma', 'Lazio', 'Napoli', 'Atalanta', 'Fiorentina', 'Torino', 'Bologna', 'Udinese', 'Sassuolo', 'Salernitana', 'Lecce', 'Empoli', 'Hellas Vérone', 'Monza', 'Frosinone', 'Cagliari', 'Genoa'],
      },
      {
        name: 'Ligue des Champions UEFA', flag: '🏆',
        clubs: ['Real Madrid', 'Manchester City', 'Bayern Munich', 'PSG', 'Liverpool', 'Chelsea', 'FC Barcelona', 'Juventus', 'Inter Milan', 'Borussia Dortmund', 'Atlético Madrid', 'Porto', 'Ajax', 'Benfica', 'Shakhtar Donetsk', 'RB Leipzig'],
      },
      {
        name: 'Ligue Europa UEFA', flag: '🇪🇺',
        clubs: ['Arsenal', 'Roma', 'Bayer Leverkusen', 'Atalanta', 'Sporting CP', 'PSV Eindhoven', 'Feyenoord', 'Olympique de Marseille', 'Séville FC', 'Villarreal', 'Lyon', 'Braga'],
      },
      {
        name: 'CAN (Coupe d\'Afrique des Nations)', flag: '🌍',
        clubs: ['Sénégal', 'Maroc', 'Égypte', 'Nigeria', 'Cameroun', 'Côte d\'Ivoire', 'Ghana', 'Algérie', 'Tunisie', 'Mali', 'Burkina Faso', 'Guinée', 'RD Congo', 'Afrique du Sud', 'Zambie', 'Tanzania', 'Cap-Vert', 'Gabon', 'Mozambique', 'Angola'],
      },
      {
        name: 'Ligue des Champions CAF', flag: '🌍',
        clubs: ['Al Ahly (Égypte)', 'Wydad Casablanca (Maroc)', 'Espérance Tunis (Tunisie)', 'Mamelodi Sundowns (Afrique du Sud)', 'TP Mazembe (RDC)', 'AS Vita Club (RDC)', 'Zamalek (Égypte)', 'Raja Casablanca (Maroc)', 'Coton Sport (Cameroun)', 'ASEC Mimosas (Côte d\'Ivoire)', 'AS FAR (Maroc)', 'Simba SC (Tanzania)'],
      },
      {
        name: 'Ligue 1 (Cameroun)', flag: '🇨🇲',
        clubs: ['Coton Sport FC', 'Canon Yaoundé', 'Tonnerre Yaoundé', 'Union Sportive Douala', 'Fovu Club Baham', 'AS Fortuna', 'Panthère du Ndé', 'Racing Club Bafoussam', 'Eding Sport FC', 'Yaoundé II'],
      },
    ],
  },
  {
    emoji: '🏀',
    name: 'Basketball',
    leagues: [
      {
        name: 'NBA (USA)', flag: '🇺🇸',
        clubs: ['Los Angeles Lakers', 'Golden State Warriors', 'Boston Celtics', 'Miami Heat', 'Chicago Bulls', 'Brooklyn Nets', 'Phoenix Suns', 'Dallas Mavericks', 'Milwaukee Bucks', 'Denver Nuggets', 'Philadelphia 76ers', 'Cleveland Cavaliers', 'Atlanta Hawks', 'Memphis Grizzlies', 'New Orleans Pelicans', 'Sacramento Kings', 'Portland Trail Blazers', 'Oklahoma City Thunder', 'San Antonio Spurs', 'Orlando Magic'],
      },
      {
        name: 'Euroleague', flag: '🇪🇺',
        clubs: ['Real Madrid', 'CSKA Moscou', 'Fenerbahçe', 'Anadolu Efes', 'FC Barcelone', 'Olympiacos', 'Panathinaïkos', 'Maccabi Tel Aviv', 'ALBA Berlin', 'Bayern Munich', 'Zalgiris Kaunas', 'Monaco Basket', 'Virtus Bologne', 'Valencia Basket', 'Baskonia', 'Partizan Belgrade'],
      },
      {
        name: 'Pro A (France)', flag: '🇫🇷',
        clubs: ['AS Monaco', 'Le Mans Sarthe Basket', 'Roanne', 'Limoges CSP', 'Strasbourg IG', 'Nanterre 92', 'Paris Basketball', 'Metropolitans 92', 'JL Bourg', 'Cholet Basket', 'Dijon', 'Gravelines-Dunkerque', 'Pau-Lacq-Orthez', 'Chalon-sur-Saône', 'Nancy', 'Antibes'],
      },
      {
        name: 'Afrobasket (Afrique)', flag: '🌍',
        clubs: ['Nigeria', 'Sénégal', 'Tunisie', 'Côte d\'Ivoire', 'Angola', 'Égypte', 'Cameroun', 'RD Congo', 'Cap-Vert', 'Mozambique', 'Rwanda', 'Maroc'],
      },
    ],
  },
  {
    emoji: '🎾',
    name: 'Tennis',
    leagues: [
      {
        name: 'Grand Chelem', flag: '🏆',
        clubs: ['Roland Garros (Paris)', 'Wimbledon (Londres)', 'US Open (New York)', 'Australian Open (Melbourne)'],
      },
      {
        name: 'ATP Masters 1000', flag: '🎾',
        clubs: ['Novak Djokovic', 'Carlos Alcaraz', 'Jannik Sinner', 'Daniil Medvedev', 'Alexander Zverev', 'Stefanos Tsitsipas', 'Andrey Rublev', 'Casper Ruud', 'Holger Rune', 'Taylor Fritz', 'Tommy Paul', 'Ben Shelton', 'Grigor Dimitrov', 'Hubert Hurkacz', 'Nicolas Jarry'],
      },
      {
        name: 'WTA (Femmes)', flag: '👩',
        clubs: ['Iga Swiatek', 'Aryna Sabalenka', 'Coco Gauff', 'Elena Rybakina', 'Jessica Pegula', 'Marketa Vondrousova', 'Ons Jabeur', 'Karolina Muchova', 'Barbora Krejcikova', 'Qinwen Zheng', 'Caroline Garcia', 'Simona Halep', 'Victoria Azarenka', 'Madison Keys', 'Mirra Andreeva'],
      },
    ],
  },
  {
    emoji: '🏈',
    name: 'NFL',
    leagues: [
      {
        name: 'NFC Est', flag: '🇺🇸',
        clubs: ['Dallas Cowboys', 'Philadelphia Eagles', 'New York Giants', 'Washington Commanders'],
      },
      {
        name: 'NFC Nord', flag: '🇺🇸',
        clubs: ['Green Bay Packers', 'Minnesota Vikings', 'Chicago Bears', 'Detroit Lions'],
      },
      {
        name: 'NFC Sud', flag: '🇺🇸',
        clubs: ['New Orleans Saints', 'Tampa Bay Buccaneers', 'Atlanta Falcons', 'Carolina Panthers'],
      },
      {
        name: 'NFC Ouest', flag: '🇺🇸',
        clubs: ['San Francisco 49ers', 'Los Angeles Rams', 'Seattle Seahawks', 'Arizona Cardinals'],
      },
      {
        name: 'AFC Est', flag: '🇺🇸',
        clubs: ['Buffalo Bills', 'Miami Dolphins', 'New England Patriots', 'New York Jets'],
      },
      {
        name: 'AFC Nord', flag: '🇺🇸',
        clubs: ['Baltimore Ravens', 'Cincinnati Bengals', 'Pittsburgh Steelers', 'Cleveland Browns'],
      },
      {
        name: 'AFC Sud', flag: '🇺🇸',
        clubs: ['Kansas City Chiefs', 'Las Vegas Raiders', 'Los Angeles Chargers', 'Denver Broncos'],
      },
      {
        name: 'AFC Ouest', flag: '🇺🇸',
        clubs: ['Jacksonville Jaguars', 'Tennessee Titans', 'Indianapolis Colts', 'Houston Texans'],
      },
    ],
  },
  {
    emoji: '🏒',
    name: 'Hockey',
    leagues: [
      {
        name: 'NHL (Conférence Est)', flag: '🇺🇸',
        clubs: ['Boston Bruins', 'Buffalo Sabres', 'Detroit Red Wings', 'Florida Panthers', 'Montreal Canadiens', 'Ottawa Senators', 'Tampa Bay Lightning', 'Toronto Maple Leafs', 'Carolina Hurricanes', 'Columbus Blue Jackets', 'New Jersey Devils', 'New York Islanders', 'New York Rangers', 'Philadelphia Flyers', 'Pittsburgh Penguins', 'Washington Capitals'],
      },
      {
        name: 'NHL (Conférence Ouest)', flag: '🇺🇸',
        clubs: ['Arizona Coyotes', 'Chicago Blackhawks', 'Colorado Avalanche', 'Dallas Stars', 'Minnesota Wild', 'Nashville Predators', 'St. Louis Blues', 'Winnipeg Jets', 'Anaheim Ducks', 'Calgary Flames', 'Edmonton Oilers', 'Los Angeles Kings', 'San Jose Sharks', 'Seattle Kraken', 'Vancouver Canucks', 'Vegas Golden Knights'],
      },
      {
        name: 'KHL (Russie/Europe)', flag: '🇷🇺',
        clubs: ['SKA Saint-Pétersbourg', 'CSKA Moscou', 'Dinamo Moscou', 'Ak Bars Kazan', 'Avangard Omsk', 'Metallurg Magnitogorsk', 'Lokomotiv Yaroslavl', 'Dynamo Minsk'],
      },
    ],
  },
  {
    emoji: '⚾',
    name: 'Baseball',
    leagues: [
      {
        name: 'MLB Ligue Nationale', flag: '🇺🇸',
        clubs: ['Los Angeles Dodgers', 'San Francisco Giants', 'San Diego Padres', 'Colorado Rockies', 'Arizona Diamondbacks', 'Atlanta Braves', 'Miami Marlins', 'New York Mets', 'Philadelphia Phillies', 'Washington Nationals', 'Chicago Cubs', 'Cincinnati Reds', 'Milwaukee Brewers', 'Pittsburgh Pirates', 'St. Louis Cardinals'],
      },
      {
        name: 'MLB Ligue Américaine', flag: '🇺🇸',
        clubs: ['New York Yankees', 'Boston Red Sox', 'Toronto Blue Jays', 'Baltimore Orioles', 'Tampa Bay Rays', 'Houston Astros', 'Los Angeles Angels', 'Oakland Athletics', 'Seattle Mariners', 'Texas Rangers', 'Chicago White Sox', 'Cleveland Guardians', 'Detroit Tigers', 'Kansas City Royals', 'Minnesota Twins'],
      },
    ],
  },
  {
    emoji: '🏐',
    name: 'Volleyball',
    leagues: [
      {
        name: 'VNL Hommes (Ligue des Nations)', flag: '🌍',
        clubs: ['France', 'Brésil', 'Pologne', 'Italie', 'USA', 'Slovénie', 'Japon', 'Argentine', 'Iran', 'Serbie', 'Bulgarie', 'Australie', 'Canada', 'Allemagne', 'Pays-Bas', 'Chine'],
      },
      {
        name: 'VNL Femmes (Ligue des Nations)', flag: '🌍',
        clubs: ['USA', 'Brésil', 'Italie', 'Turquie', 'Chine', 'Serbie', 'Pologne', 'Pays-Bas', 'Japon', 'Thaïlande', 'Allemagne', 'Canada', 'France', 'Bulgarie', 'Corée du Sud', 'République Dominicaine'],
      },
      {
        name: 'Championnat d\'Afrique', flag: '🌍',
        clubs: ['Égypte', 'Cameroun', 'Tunisie', 'Kenya', 'Maroc', 'Nigeria', 'RD Congo', 'Algérie', 'Sénégal', 'Angola'],
      },
    ],
  },
  {
    emoji: '🥊',
    name: 'Boxe / MMA',
    leagues: [
      {
        name: 'UFC – Poids Lourds', flag: '🥊',
        clubs: ['Jon Jones', 'Stipe Miocic', 'Ciryl Gane', 'Tom Aspinall', 'Sergei Pavlovich', 'Curtis Blaydes', 'Jailton Almeida'],
      },
      {
        name: 'UFC – Poids Welters', flag: '🥊',
        clubs: ['Leon Edwards', 'Colby Covington', 'Kamaru Usman', 'Belal Muhammad', 'Gilbert Burns', 'Khamzat Chimaev', 'Sean Brady'],
      },
      {
        name: 'UFC – Poids Légers', flag: '🥊',
        clubs: ['Islam Makhachev', 'Charles Oliveira', 'Dustin Poirier', 'Justin Gaethje', 'Beneil Dariush', 'Arman Tsarukyan', 'Mateusz Gamrot'],
      },
      {
        name: 'Boxe – Poids Lourds', flag: '🥊',
        clubs: ['Oleksandr Usyk', 'Tyson Fury', 'Anthony Joshua', 'Deontay Wilder', 'Daniel Dubois', 'Joseph Parker', 'Zhilei Zhang', 'Filip Hrgovic'],
      },
      {
        name: 'Boxe – Super Welters', flag: '🥊',
        clubs: ['Canelo Alvarez', 'Jermell Charlo', 'Tim Tszyu', 'Terence Crawford', 'Errol Spence Jr', 'Sebastian Fundora', 'Demetrius Andrade'],
      },
    ],
  },
  {
    emoji: '🏊',
    name: 'Natation / Athlétisme',
    leagues: [
      {
        name: 'Championnats du Monde Athlétisme', flag: '🌍',
        clubs: ['Noah Lyles (USA)', 'Marcell Jacobs (Italie)', 'Ferdinand Omanyala (Kenya)', 'Kishane Thompson (Jamaïque)', 'Mondo Duplantis (Suède)', 'Armand Duplantis', 'Sydney McLaughlin (USA)', 'Faith Kipyegon (Kenya)', 'Shelly-Ann Fraser-Pryce (Jamaïque)', 'Julien Alfred (Sainte-Lucie)'],
      },
      {
        name: 'Championnats du Monde Natation', flag: '🌍',
        clubs: ['Léon Marchand (France)', 'Caeleb Dressel (USA)', 'Adam Peaty (GB)', 'Kristof Milak (Hongrie)', 'Katie Ledecky (USA)', 'Sarah Sjostrom (Suède)', 'Ariarne Titmus (Australie)', 'Emma McKeon (Australie)'],
      },
    ],
  },
  {
    emoji: '🏉',
    name: 'Rugby',
    leagues: [
      {
        name: 'Coupe du Monde de Rugby', flag: '🏆',
        clubs: ['Nouvelle-Zélande (All Blacks)', 'Afrique du Sud (Springboks)', 'Irlande', 'France', 'Australie (Wallabies)', 'Angleterre', 'Argentine (Los Pumas)', 'Écosse', 'Pays de Galles', 'Japon (Brave Blossoms)'],
      },
      {
        name: 'Top 14 (France)', flag: '🇫🇷',
        clubs: ['Stade Toulousain', 'Racing 92', 'Stade Rochelais', 'ASM Clermont', 'UBB Bordeaux-Bègles', 'RC Toulon', 'Stade Aurillacois', 'CA Brive', 'Bayonne', 'Pau', 'Lyon OU', 'Section Paloise', 'Montpellier HR', 'Perpignan'],
      },
      {
        name: 'Six Nations', flag: '🇪🇺',
        clubs: ['France', 'Irlande', 'Angleterre', 'Écosse', 'Pays de Galles', 'Italie'],
      },
    ],
  },
];

export default function SportsPage() {
  const [activeSport, setActiveSport] = useState<string>(SPORTS_DATA[0].name);
  const [openLeague,  setOpenLeague]  = useState<string | null>(null);

  const currentSport = SPORTS_DATA.find(s => s.name === activeSport)!;

  return (
    <div className="max-w-5xl mx-auto animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <Trophy className="w-6 h-6 text-brand-400" />
        <h1 className="font-display font-extrabold text-2xl">Sports</h1>
        <span className="text-dark-400 text-sm">{SPORTS_DATA.length} sports disponibles</span>
      </div>

      <div className="flex gap-6">
        {/* ── Colonne gauche : sports ── */}
        <div className="w-52 shrink-0 space-y-1">
          {SPORTS_DATA.map(sport => (
            <button
              key={sport.name}
              onClick={() => { setActiveSport(sport.name); setOpenLeague(null); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm
                          transition-all duration-200 font-medium
                          ${activeSport === sport.name
                            ? 'bg-brand-500/15 border border-brand-500/30 text-brand-400'
                            : 'text-dark-300 hover:text-white hover:bg-white/5'}`}
            >
              <span className="text-xl">{sport.emoji}</span>
              <span className="truncate">{sport.name}</span>
              <span className="ml-auto text-xs text-dark-500">{sport.leagues.length}</span>
            </button>
          ))}
        </div>

        {/* ── Colonne droite : ligues + clubs ── */}
        <div className="flex-1 space-y-3 min-w-0">
          <h2 className="font-display font-bold text-lg mb-4">
            {currentSport.emoji} {currentSport.name}
            <span className="text-dark-400 text-sm font-normal ml-2">
              — {currentSport.leagues.length} compétitions
            </span>
          </h2>

          {currentSport.leagues.map(league => (
            <div key={league.name} className="card overflow-hidden">
              <button
                onClick={() => setOpenLeague(openLeague === league.name ? null : league.name)}
                className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{league.flag}</span>
                  <div className="text-left">
                    <div className="font-display font-bold text-sm">{league.name}</div>
                    <div className="text-dark-400 text-xs">{league.clubs.length} équipes / joueurs</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs text-brand-400 font-semibold hidden sm:block">Voir les matchs</span>
                  {openLeague === league.name
                    ? <ChevronDown className="w-4 h-4 text-dark-400" />
                    : <ChevronRight className="w-4 h-4 text-dark-400" />
                  }
                </div>
              </button>

              {openLeague === league.name && (
                <div className="border-t border-white/5 p-4">
                  <div className="grid grid-cols-2 gap-2">
                    {league.clubs.map(club => (
                      <div
                        key={club}
                        className="flex items-center justify-between px-3 py-2.5
                                   bg-dark-900 rounded-xl border border-transparent
                                   hover:bg-brand-500/10 hover:border-brand-500/20
                                   transition-all cursor-pointer group"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="w-7 h-7 rounded-lg bg-dark-800 border border-white/10
                                          flex items-center justify-center text-sm shrink-0">
                            {currentSport.emoji}
                          </div>
                          <span className="text-sm text-dark-200 group-hover:text-white transition-colors truncate">
                            {club}
                          </span>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-dark-600 group-hover:text-brand-400 transition-colors shrink-0 ml-1" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}