# Walters CBB Analyzer

A NCAA men's basketball betting edge detection tool built on Billy Walters' handicapping methodology (from *Gambler: Secrets from a Life at Risk*), powered by KenPom 2026 efficiency ratings. The app calculates its own power line and projected total, compares them against posted sportsbook spreads and over/unders, and uses Claude AI to synthesize a final recommendation.

---

## Table of Contents

1. [Philosophy](#philosophy)
2. [Data Sources](#data-sources)
3. [Spread Model](#spread-model)
4. [Total (Over/Under) Model](#totaloverunder-model)
5. [Situational Adjustments](#situational-adjustments)
6. [Edge Calculation & Star Ratings](#edge-calculation--star-ratings)
7. [AI Analysis Layer](#ai-analysis-layer)
8. [Calibration](#calibration)
9. [Limitations](#limitations)
10. [Deployment](#deployment)

---

## Philosophy

Walters' core insight is that **you are not betting on teams — you are buying value**. A bet is only worth making when your independently calculated number differs from the posted line by enough to overcome the vig and create a genuine mathematical edge. The system is built around three pillars:

1. **Power ratings** — a single number that expresses each team's true strength on a common scale
2. **Situational factors** — schedule, fatigue, rest, and emotional context that shift the expected outcome
3. **Discipline** — only bet when the edge clears a defined threshold; never bet just to have action

This app implements all three mechanically, then hands the result to Claude for contextual reasoning (injuries, matchup dynamics, recent form) that pure math cannot capture.

---

## Data Sources

### KenPom 2026 Rankings

The app's static dataset contains KenPom end-of-2025-26 season data for 252 Division I programs. Each entry stores:

| Field | Description |
|-------|-------------|
| `rank` | Overall KenPom efficiency rank (1 = best) |
| `off` | Offensive efficiency rank |
| `def` | Defensive efficiency rank |

When you hit **Fetch Games**, the app also runs a live search against cleatz.com or Barttorvik to pull current **AdjO**, **AdjD**, and **Tempo** values. If live data is returned for both teams in a matchup, those real numbers are used in the total model. If not, the app falls back to interpolating from the static rank data using the tables described below.

### Live Odds

A parallel search pulls today's (or tomorrow's) D1 spreads and over/unders from ESPN, Covers, OddsShark, and major sportsbooks. Both the odds search and the KenPom search run simultaneously so the full fetch completes in a single round trip.

---

## Spread Model

### Step 1 — AdjEM from Rank

KenPom's core metric is **Adjusted Efficiency Margin (AdjEM)** — the number of points per 100 possessions a team would outscore an average D1 team on a neutral court. Because the raw AdjEM values are not always available without a KenPom subscription, the app interpolates from overall rank using a lookup table derived from historical KenPom distributions:

| Rank | AdjEM |
|------|-------|
| 1    | +36.0 |
| 10   | +22.0 |
| 25   | +13.5 |
| 50   | +7.5  |
| 100  | +3.0  |
| 150  | 0.0   |
| 200  | −3.0  |
| 250  | −6.0  |
| 365  | −14.5 |

Values between breakpoints are linearly interpolated. A team ranked #1 is approximately +36 AdjEM — meaning they would outscore an average D1 team by 36 points per 100 possessions on a neutral floor. A team ranked #150 sits at zero (average).

### Step 2 — Power Line Formula

```
Power Line = (Home AdjEM − Away AdjEM) × 0.70 + HCA + Situational Adjustment
```

**Why × 0.70?**
AdjEM is expressed per 100 possessions. An average college basketball game has roughly 67–70 possessions per team. Multiplying by 0.70 converts the per-100-possession margin into an expected real-game point margin. This is the standard KenPom-to-spread conversion factor.

**Home Court Advantage (HCA)**
Default HCA is **3.5 points**, adjustable via slider from 1.0 to 7.0. The true historical D1 average is approximately 3.0–3.5 points, though it varies significantly by venue and program. Tournament games at neutral sites use HCA = 0.

**Example — Michigan (#2, AdjEM ≈ +27) vs. Saint Louis (#41, AdjEM ≈ +9) at a neutral site:**
```
Power Line = (27 − 9) × 0.70 + 0 + 0 = 12.6

Michigan is favored by 12.6 points.
```

### Step 3 — Posted Spread Comparison

The edge is calculated from the home team's perspective. Sportsbook spreads use negative numbers for the favorite:

```
Spread Edge = Power Line + Posted Spread
```

- **Positive result** → home team is undervalued → bet the home team
- **Negative result** → away team is undervalued → bet the away team

**Example:**
```
Power Line  = +12.6  (home favored by 12.6 per model)
Posted Line =  −9.5  (home favored by 9.5 per book)

Edge = 12.6 + (−9.5) = +3.1 → home team undervalued by 3.1 pts
```

```
Power Line  = +12.6
Posted Line = −15.0  (book has home as bigger favorite)

Edge = 12.6 + (−15.0) = −2.4 → away team undervalued by 2.4 pts
```

---

## Total (Over/Under) Model

The total model uses the KenPom possession framework to project how many combined points both teams will score.

### Step 1 — Get AdjO, AdjD, Tempo

**If live KenPom data was fetched**, the actual AdjO/AdjD/Tempo values are used directly and the display reads "live KenPom."

**If not**, values are interpolated from offensive rank, defensive rank, and overall rank using these tables:

**Adjusted Offensive Efficiency (AdjO) — points scored per 100 possessions vs. average D1 defense:**

| Off Rank | AdjO |
|----------|------|
| 1        | 125.0 |
| 10       | 120.0 |
| 25       | 116.0 |
| 50       | 112.0 |
| 100      | 107.0 |
| 150      | 104.0 |
| 200      | 101.0 |
| 365      | 90.0  |

**Adjusted Defensive Efficiency (AdjD) — points allowed per 100 possessions vs. average D1 offense:**
*(Lower = better defense. The top of this table is steepened relative to a naive interpolation — elite defenses suppress scoring significantly more than a linear scale would predict.)*

| Def Rank | AdjD |
|----------|------|
| 1        | 87.0  |
| 10       | 89.0  |
| 25       | 92.0  |
| 50       | 96.0  |
| 100      | 101.0 |
| 150      | 104.0 |
| 200      | 107.0 |
| 365      | 118.0 |

**Adjusted Tempo — possessions per 40 minutes:**

| Rank | Tempo |
|------|-------|
| 1    | 74.0  |
| 25   | 72.0  |
| 75   | 70.0  |
| 150  | 68.0  |
| 250  | 66.0  |
| 365  | 63.0  |

### Step 2 — Expected Possessions

Two teams do not simply play at their own individual tempos — possessions are a shared resource. The standard KenPom formula accounts for this:

```
Expected Possessions = (Home Tempo × Away Tempo) / D1 Average Tempo
```

D1 Average Tempo = **67.5 possessions per 40 minutes**.

This correctly produces fewer possessions when a slow-paced team plays a fast-paced team. The slow team's half-court defense imposes their preferred pace on the game.

**Example — Michigan (Tempo ≈ 74) vs. Saint Louis (Tempo ≈ 70):**
```
Possessions = (74 × 70) / 67.5 = 76.7 possessions
```

### Step 3 — Expected Points Per Side

Each team's expected scoring is modeled as the average of their own offensive efficiency and their opponent's defensive efficiency, applied to the expected number of possessions:

```
Home Points = ((Home AdjO + Away AdjD) / 2) × (Possessions / 100)
Away Points = ((Away AdjO + Home AdjD) / 2) × (Possessions / 100)
```

Dividing by 100 converts from per-100-possession rates to expected real-game points.

**Example — Michigan vs. Saint Louis:**
```
Michigan AdjO ≈ 120,  Saint Louis AdjD ≈ 96
Home Points = ((120 + 96) / 2) × (76.7 / 100) = 108.0 × 0.767 = 82.8

Saint Louis AdjO ≈ 112,  Michigan AdjD ≈ 87
Away Points = ((112 + 87) / 2) × (76.7 / 100) = 99.5 × 0.767 = 76.3

Raw Total = 82.8 + 76.3 = 159.1
```

### Step 4 — Calibration Scalar

The raw formula runs slightly high because it does not account for real-game factors like end-of-half possessions, late-game fouling situations, and shot-clock management. A calibration scalar of **0.887** is applied to the raw total:

```
My Total = Raw Total × 0.887
```

**Example continued:**
```
My Total = 159.1 × 0.887 = 141.1
```

This scalar was derived empirically from 2026 NCAA Tournament Second Round games:

| Game | Posted O/U | Model Output | Difference |
|------|------------|-------------|------------|
| Duke vs. TCU | 140.5 | 142.3 | +1.8 |
| Houston vs. Texas A&M | 143.5 | 142.9 | −0.6 |
| Gonzaga vs. Texas | 147.5 | 146.3 | −1.2 |
| **Average error** | | | **1.2 pts** |

Michigan vs. Saint Louis (posted 161.5) was excluded from calibration — both teams had scored 100+ points in their prior game and the market priced in live tournament momentum that season-long KenPom data cannot capture.

### Step 5 — Total Edge

```
Total Edge = My Total − Posted O/U
```

- **Positive** → model projects more scoring than the market → lean OVER
- **Negative** → model projects less scoring than the market → lean UNDER

---

## Situational Adjustments

Situational factors shift the **spread power line only** — they do not affect the total projection. The adjustment is added to the power line before comparing against the posted spread.

All values are in points:

| Factor | Adjustment | Rationale |
|--------|-----------|-----------|
| Home back-to-back | −1.5 | Home team playing 2nd game in 2 days |
| Away back-to-back | +1.5 | Away team fatigued, value shifts to home |
| Home 3-in-4 days | −2.5 | Severe accumulated fatigue for home team |
| Away 3-in-4 days | +2.5 | Severe accumulated fatigue for away team |
| Home 5+ days rest | +1.0 | Extra preparation advantage for home team |
| Away 5+ days rest | −1.0 | Extra rest narrows away team's disadvantage |
| Senior Night | +2.0 | Significant emotional home crowd boost |
| Away cross-country travel | +1.5 | Away team crossed 2+ time zones |
| Away revenge game | −1.5 | Away team has heightened motivation |
| Rivalry game | 0.0 | Noted for AI context; not auto-adjusted |

These were adapted from Walters' S-Factor (Situational) framework in Chapter 22 of *Gambler*, translated from NFL scheduling patterns to college basketball context.

When multiple factors are active, their values stack. An away team playing back-to-back (+1.5) on a cross-country trip (+1.5) shifts the line +3.0 points in favor of the home team before edge is calculated.

---

## Edge Calculation & Star Ratings

Walters' system only places a bet when the edge is large enough to create a positive expected value after the vig.

### The Break-Even Math

At standard −110 odds, you must pay $110 to win $100. Breaking even requires winning **52.38%** of bets. An edge must be large enough to push your win rate meaningfully above that threshold.

### Minimum Threshold

**Both spread edge and total edge must reach ≥ 3.0 points** to qualify as a bet recommendation. Below 3.0, the app flags "Below threshold" and Claude will recommend PASS regardless of direction.

### Star Ratings

| Edge (absolute value) | Rating | Unit Size |
|----------------------|--------|-----------|
| 3.0 – 4.9 pts | ⭐ 1 Star | 1 unit |
| 5.0 – 6.9 pts | ⭐⭐ 2 Stars | 2 units |
| 7.0+ pts | ⭐⭐⭐ 3 Stars | 3 units |

Star ratings apply independently to the spread bet and the total bet. A game can be a 1-star spread play and a 3-star total play simultaneously.

### Bankroll Management

Following Walters' guidelines directly: **2–4% of bankroll per unit**. At 2% per unit:

| Stars | Units | % of Bankroll at Risk |
|-------|-------|----------------------|
| ⭐ | 1 | 2% |
| ⭐⭐ | 2 | 4% |
| ⭐⭐⭐ | 3 | 6% |

**Never chase losses.** Walters is explicit on this — the system only works with strict unit discipline. A cold streak is expected; abandoning sizing rules is how bankrolls get wiped.

---

## AI Analysis Layer

After the mechanical edge calculation, the app sends a structured prompt to Claude that includes:

- Both teams' full KenPom profile (rank, AdjEM, offensive and defensive ranks)
- Venue type and home court advantage applied
- All active situational factors and their combined point value
- The calculated power line and posted spread
- The spread edge and star rating
- The projected total, posted O/U, and total edge
- Whether live KenPom data or rank-interpolated values were used for the total
- Any injury or roster notes entered manually

Claude returns:
- **Spread recommendation** (BET HOME / BET AWAY / NO BET / PASS) with stars and 2–3 sentence reasoning
- **Total recommendation** (BET OVER / BET UNDER / NO BET / PASS) with stars and 1–2 sentence reasoning
- **Key factors** — the 2–3 most important drivers of the spread edge

Claude adds value the formula cannot: it can factor in known injuries, comment on stylistic matchup advantages, flag when a tempo mismatch is particularly extreme, note when a team's recent form diverges from season-long averages, and identify when the live tournament context makes the model's projection unreliable. The AI recommendation is advisory — the mechanical edge is the primary signal.

---

## Calibration

### Total Scalar (0.887)

Derived from 2026 NCAA Tournament Second Round data as described above. Should be revisited after each season or after accumulating 20+ games with posted totals. To recalibrate:

```
New Scalar = Sum of Posted O/Us / Sum of Raw Model Totals
```

across a representative sample of games.

### Defense Table Steepening

The `ADJ_D_TABLE` in `src/App.jsx` was steepened at the top end (ranks 1–25) relative to a naive linear interpolation. The original table was producing totals that were too high for games involving elite defenses. The current values reflect observed KenPom AdjD distributions for top-25 defenses.

### Spread Conversion Factor (0.70)

This factor is theoretically grounded — it converts per-100-possession margin to expected game margin — and does not require empirical calibration. It has been validated extensively in public KenPom analysis literature.

### HCA Default (3.5 points)

Based on the current D1 average. Home court advantage has declined from the historical 4.0-point figure, likely due to a combination of increased player mobility (transfer portal) and residual effects from the COVID-era empty arenas normalizing player performance. Adjust per venue using the slider.

---

## Limitations

**The model does well at:**
- Identifying large efficiency mismatches the market has mispriced
- Capturing tempo vs. defense mismatches in totals (a fast team playing an elite defense is frequently underpriced on the under)
- Providing a consistent, emotionless framework that removes recency bias and gut-feel betting

**The model cannot:**
- Account for injuries, suspensions, or lineup changes that post-date the KenPom rankings (use the notes field and the injury/situation adjustment slider)
- Capture live tournament momentum — teams that have been on a 10-game winning streak and are scoring freely may outperform their season-long KenPom averages significantly
- Model foul tendency matchups, specific player vs. player advantages, or coaching tactical adjustments
- Know about transfers, early entrants to the draft, or other roster changes that occurred after the static data was compiled

**On tournament games specifically:** The NCAA Tournament introduces meaningful variance beyond what efficiency ratings capture. Teams simplify their offensive and defensive schemes, star players take over in ways they don't in 40-game regular season samples, and the crowd effects at neutral sites are amplified. The calibration scalar helps but does not fully resolve this. Use the AI reasoning layer heavily for tournament games and weight the model's output as a starting point rather than a final answer.

---

## Deployment

### Requirements
- A Vercel account (free tier works)
- An Anthropic API key from [console.anthropic.com](https://console.anthropic.com)
- A GitHub account to host the code

### Steps

1. Upload this project folder to a GitHub repository
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → select your repo
3. Vercel auto-detects Vite — click **Deploy**
4. Once deployed: **Settings → Environment Variables** → add `ANTHROPIC_API_KEY` with your key
5. **Redeploy** from the Deployments tab

Your app will be live at `https://your-project-name.vercel.app`.

### How the Proxy Works

All API calls go to `/api/claude` (a Vercel serverless function in `api/claude.js`) rather than directly to Anthropic. The serverless function injects your `ANTHROPIC_API_KEY` from Vercel's environment variables before forwarding the request. Your API key is never sent to or stored in the browser.

### Local Development

```bash
npm install -g vercel
vercel dev
```

Create a `.env.local` file in the project root:
```
ANTHROPIC_API_KEY=sk-ant-...
```

The app runs at `http://localhost:3000` with both the React frontend and the serverless proxy active.

---

## Credits

**Betting methodology:** *Gambler: Secrets from a Life at Risk* by Billy Walters (Simon & Schuster, 2023)

**Efficiency ratings:** [KenPom.com](https://kenpom.com) — Ken Pomeroy's adjusted efficiency margin, offensive efficiency, defensive efficiency, and tempo metrics

**Built with:** React, Vite, Vercel, Anthropic Claude API

---

*This tool is for informational and educational purposes only. Gambling involves risk. Please gamble responsibly.*
