# Trail race planner

An offline web app for trail races: GPX course, race plan from screenshots, fuel reminders and GPS pacing.

## Put it online (free)

Any static host works. Upload all files in this folder together (index.html, sw.js, manifest.webmanifest and the three PNG icons).

**From an iPhone: GitHub Pages**
1. Sign up at github.com, then tap + and New repository. Name it `race-plan`, set it to Public, and create it.
2. Tap "uploading an existing file", choose all files from this folder in the Files app, and commit.
3. Go to Settings, Pages. Under Branch choose `main` and `/ (root)`, then Save.
4. After a minute your app is at `https://YOUR-NAME.github.io/race-plan/`.

**From a computer: Netlify Drop**
Open app.netlify.com/drop and drag this whole folder onto the page. You get a link right away.

## Install on iPhone

1. Open your link in Safari while you have signal.
2. Tap Share, then Add to Home Screen.
3. Open it once from the Home Screen. It now works with no signal.

Allow location when asked, so GPS pacing works. Your race data stays on your phone, and each person who opens the link gets their own empty planner.

## Updating

After you change any file, change `VERSION` at the top of `sw.js` (for example `trailplan-v4`), upload again, then open the app twice with signal to get the new version.
