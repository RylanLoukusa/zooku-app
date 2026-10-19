# Zooku

A daily animal puzzle at **[zooku.app](https://zooku.app)**. Place five prey and one predator on a 3×3 board, then decide: feed the predator or protect the prey. A new puzzle opens every day at midnight Eastern.

The site is static: plain HTML, CSS and JavaScript with no frameworks, no server and no runtime dependencies. Node is only needed to build it and to run the designer tools.

## Project layout

```
src/
  shared/        Used by the game and the tools, so they never disagree about a score
    engine.js      animals, habitats, scoring, solver, puzzle design checks
    art.js         painted illustrations and scenes (inline SVG)
    generator.js   builds new daily puzzles (tools only, never shipped)
  game/          The website players see: index.html, styles.css, app.js
  workshop/      The private review page (runs on your computer only)
data/
  calendar.json  Every day, past and upcoming, one per line: the puzzle, its answer and stats, and your approval
public/          Copied into the site as-is: icons, share image, fonts, _headers, robots.txt, manifest
scripts/
  build.js       builds the website into dist/
  workshop.js    runs the workshop at http://localhost:5174
  generate.js    adds days to the calendar
  runway.js      how far ahead the calendar is approved
  preview.js     serves dist/ locally with the live site's headers
test/            calendar and build checks (npm test)
.github/workflows/
  test.yml             runs the tests on every push
  nightly-publish.yml  deploys the site every evening (releasing tomorrow's puzzle) and on every push to main
  runway-check.yml     emails you (via a GitHub issue) when approved days run low
```

## Commands

Needs Node 20 or newer. There is nothing to install.

| Command | What it does |
|---|---|
| `npm run workshop` | Open the workshop at http://localhost:5174 to approve or regenerate days, or generate 30 more |
| `npm run generate -- 30` | Add 30 days to the end of the calendar (same as the workshop button) |
| `npm run runway` | Show how many upcoming days are approved |
| `npm test` | Check every day in the calendar and the website build |
| `npm run build` | Build the website into `dist/` |
| `npm run preview` | Build, then play the site at http://localhost:5173 |

## How days get released

- `data/calendar.json` holds every day, including the answer and the generator's notes. It never goes on the website.
- The build ships only the days players may see: everything up to today in New York, plus tomorrow once it is 8pm there. Answers, stats and review notes are stripped out.
- Every evening, the **Nightly publish** workflow builds and deploys the site, so tomorrow's puzzle is online before midnight. The game keeps it hidden until midnight Eastern. Any push to `main` also deploys the site.
- There are 16 themes, each with its own animals and habitat. The generator uses each theme at most twice per calendar month, about two weeks apart, so no animal or habitat shows up more than twice a month (`npm test` checks this).
- Unapproved days still go out on their date, so the game never goes blank. Approval is your review step, and the reminder makes sure you get to it.
- Never change a day once it is live: players may already have played it. The workshop locks those days.

## Monthly routine

1. `npm run workshop` and open http://localhost:5174
2. If fewer than two weeks are scheduled, click **Generate 30 more days**
3. Review the upcoming days. Approve the ones you like and regenerate the rest (Regenerate keeps the theme and the intended difficulty; Revert undoes it)
4. Commit and push the calendar:
   ```
   git add data/calendar.json
   git commit -m "Approve November puzzles"
   git push
   ```

When fewer than 7 upcoming days are approved, or fewer than 14 are scheduled, the **Approved-days reminder** opens a GitHub issue, which GitHub emails to you. It closes itself once you're ahead again.

## Going live on Cloudflare (one-time setup)

zooku.app is a Cloudflare Worker named `zooku-app` that serves the files in `dist/` (see `wrangler.jsonc`). GitHub deploys it with an API token:

1. **Create a token.** In the Cloudflare dashboard, open **My Profile → API Tokens → Create Token**, use the **Edit Cloudflare Workers** template, pick your account and zone, and create it.
2. **Give it to GitHub.** In this repo on GitHub, go to **Settings → Secrets and variables → Actions → New repository secret**, name it `CLOUDFLARE_API_TOKEN` and paste the token. If the token can see more than one Cloudflare account, also add `CLOUDFLARE_ACCOUNT_ID` (shown on the Workers & Pages overview).
3. **Test it.** On GitHub, open **Actions → Nightly publish → Run workflow**. A new version of `zooku-app` should show up in Cloudflare a minute later.

To deploy by hand instead, after `npx wrangler login`: run `npm run build && npx wrangler versions upload`, then `npx wrangler versions deploy <version-id>@100%` with the ID it prints. Upload-then-deploy only replaces the site files; a plain `wrangler deploy` would also reapply Worker settings such as routes from `wrangler.jsonc`, which doesn't list them.

Dashboard labels move around occasionally; the settings themselves stay the same.

## Privacy

There are no accounts, ads, cookies or analytics. Progress is saved only in the player's browser (`localStorage`). Fonts and icons are served from this site. The only third party is the feedback button, which opens a Google Form. `public/_headers` sets a strict content security policy so the page can only load its own files.

## Credits

Fonts: Cormorant Garamond and IBM Plex Mono, both under the SIL Open Font License (licenses in `public/fonts/`). All illustrations are original to Zooku.
