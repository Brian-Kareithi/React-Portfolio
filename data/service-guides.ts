export interface ServiceGuide {
  what: string;
  role: string;
  tags: string[];
}

const GUIDES: [match: RegExp, guide: ServiceGuide][] = [
  [/jellyfin/i, {
    what: "A personal streaming service, like a private Netflix. It organises movies, shows and music stored on the server and streams them to any TV, phone or browser.",
    role: "The front door of the media stack: everything the other media services fetch ends up here, ready to watch.",
    tags: ["Media server", "Streaming"],
  }],
  [/sonarr/i, {
    what: "A TV show manager. You tell it which series you follow and it watches for new episodes, downloads them, then renames and files them neatly.",
    role: "Keeps the TV library up to date without anyone checking release dates by hand.",
    tags: ["Automation", "TV"],
  }],
  [/radarr/i, {
    what: "Sonarr's sibling for movies. It tracks a wanted list, grabs each film once it is available in the chosen quality, and files it in the library.",
    role: "Handles the movie side of the library, including upgrading files when a better version appears.",
    tags: ["Automation", "Movies"],
  }],
  [/lidarr/i, {
    what: "The music version of Sonarr and Radarr. It follows artists, finds new albums and keeps the music library tagged and organised.",
    role: "Feeds Jellyfin's music library so albums show up complete, with proper artwork and track names.",
    tags: ["Automation", "Music"],
  }],
  [/prowlarr/i, {
    what: "A search hub. Instead of setting up every search source in each app, Prowlarr manages them in one place and shares them with Sonarr, Radarr and Lidarr.",
    role: "One place to add or fix a source, and every downloader picks it up automatically.",
    tags: ["Indexer manager"],
  }],
  [/seerr|overseerr|jellyseerr/i, {
    what: "A request page for the household. Anyone can search for a movie or show and ask for it, and the request is passed to Radarr or Sonarr.",
    role: "Lets family request things themselves instead of messaging me, with approvals and status in one place.",
    tags: ["Requests", "Self-service"],
  }],
  [/ombi/i, {
    what: "Another request portal, similar to Seerr. Users browse, request and get notified when their request is ready to watch.",
    role: "Kept alongside Seerr while I compare the two.",
    tags: ["Requests"],
  }],
  [/qbittorrent/i, {
    what: "A download client. It does the actual downloading when Sonarr, Radarr or Lidarr hand it something to fetch.",
    role: "The worker at the end of the pipeline, with speed limits so it never slows down the rest of the network.",
    tags: ["Downloads"],
  }],
  [/casaos/i, {
    what: "A friendly home-server dashboard for installing and managing apps in Docker with a few clicks, without the command line.",
    role: "A quick way to try a new app before giving it a proper, permanent setup.",
    tags: ["Server management", "Docker"],
  }],
  [/uptime\s*kuma/i, {
    what: "A monitoring tool. It checks every service every minute and sends an alert the moment something stops responding.",
    role: "How I find out something is down before anyone else in the house does.",
    tags: ["Monitoring", "Alerts"],
  }],
  [/internet/i, {
    what: "A connectivity check that watches the home internet connection and records when it drops and for how long.",
    role: "Separates an internet outage from a problem with the lab itself, so I fix the right thing.",
    tags: ["Monitoring", "Network"],
  }],
  [/flaresolverr/i, {
    what: "A helper that gets past bot-protection pages (the 'checking your browser' screens) on some search sources, so automated searches still work.",
    role: "Sits behind Prowlarr and only steps in when a source puts up a challenge page.",
    tags: ["Proxy", "Helper"],
  }],
  [/coolify/i, {
    what: "A self-hosted alternative to services like Vercel or Heroku. Point it at a Git repository and it builds and deploys the app on my own hardware.",
    role: "Where my side projects run: push to Git and the new version goes live in the lab.",
    tags: ["Deployments", "PaaS"],
  }],
  [/homepage/i, {
    what: "The lab's start page: one dashboard with a link and live status for every service. The data on this page comes from it.",
    role: "The home screen for the whole lab, and the source behind this board.",
    tags: ["Dashboard"],
  }],
];

export function guideFor(name: string): ServiceGuide | undefined {
  return GUIDES.find(([match]) => match.test(name))?.[1];
}
