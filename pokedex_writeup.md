# A Massively Overbuilt Pokedex Spreadsheet

Back in 2019 and 2020 (just before COVID became a major issue), I bought Pokemon Sword. I wanted the game because it was the first mainline Pokemon title that was going to be on a television natively through the Switch.

I made a major miscalculation though. I hadn't seriously played a Pokemon game since Yellow, and there have been some… minor updates since then.

So, I did what any self-respecting man would do and built a massively overbuilt spreadsheet that acts more like a database than a damage multiplier calculator.

The user-facing version is simple. Type a pokemon's name in D1 and the sheet gives you the full type listing across all regional variants, lets you select which region you care about, shows the evolution tree including region-specific forms, tells you the pokemon's evolution stage and which generation it was introduced in, displays a defensive matchup chart against every attacking type, and lets you preview damage multipliers for specific attack types including STAB.

That part isn't the interesting part. Any halfway-competent spreadsheet user could build something with those features given enough time.

The interesting part is what's underneath.

The sheet has 18 types, three regional variant slots (Standard, Alolan, Galarian), and 893 pokemon. A naive implementation of the damage calculator would write a separate set of formulas for each region — one column for Standard's calculations, one for Alolan, one for Galarian. That works, but it triples the formula count, and adding a fourth region (Hisuian, Paldean) would mean writing the entire calculation layer over again from scratch.

I didn't want that. I wanted to write the damage formula *once* and have it dispatch to the right column at runtime based on what the user selected. So I leaned on three things working together:

**Named ranges as a schema abstraction.** The Master Pokedex sheet stores the data, but no formula in the workbook references it by cell coordinates. They reference a named range called `Pokedex` instead. That means the underlying sheet can grow, get reorganized, even get renamed — and as long as the named range definition gets updated, every formula in the workbook keeps working. Same logic for the type charts (`Dmgchart`), the evolution trees (`Treelookup`), the region selector dropdown values (`Region`). The named ranges are a contract between the data and the formulas; the contract doesn't care how the data is laid out.

**Runtime column dispatch via INDIRECT(ADDRESS()).** The actual damage calculation looks like this:

```
=HLOOKUP(INDIRECT(ADDRESS(3, VLOOKUP($F$20, RgnLookup, 2, FALSE), 4, 1)),
         Dmgchart,
         VLOOKUP(A21, Defend, 2, FALSE),
         FALSE)
```

Read inside-out: the user's region selection ("Standard," "Alolan," "Galarian") gets looked up in `RgnLkup` to find a column index. `ADDRESS()` builds a cell reference to row 3 of that column. `INDIRECT()` resolves the reference at runtime, returning whatever pokemon type lives in that cell — i.e., whatever type the selected pokemon is *for the selected region*. That value then feeds into `HLOOKUP` against the damage chart to find the matchup multiplier.

The formula doesn't know what region you picked. It doesn't need to. The dispatch happens at evaluation time. Adding a new region is a four-step change: add a column to the Master Pokedex, add a row to `RgnLookup`, add the region label to the dropdown source range, done. No formula gets touched.

**Conditional schema for sparse data.** Most Pokemon only have their standard forms with their associated types. I had to engineer for the graceful degradation when Alolan or Galarian were selected, as presumably this sheet would be used specifically with the games that have those variant forms. That fallback is invisible to the user; they just see correct data.

The cost of these three patterns working together is that the formulas become genuinely difficult to read. The `INDIRECT(ADDRESS(..., VLOOKUP(...), ...))` chain is doing four things in one expression. The benefit is that the system *as a whole* stays small. The Calculator sheet has 99 formulas total. A naive implementation would have several hundred, all of them more readable individually but unmaintainable in aggregate.

**UI Considerations** There's one more pattern worth pointing out: a hidden column. Column M on the Calculator holds the dispatch tables (`RgnLookup`, `TypeLookup`) and the intermediate state for the defense calculator (the resolved type 1, type 2, region, and the per-type multipliers). It's hidden from the user because they don't need to see it — they need the inputs and the outputs. The implementation layer lives behind the interface. That's the same separation databases use: hide the query plan, expose the result.

**What I punted on.** Eevee. The Eeveelutions don't fit the schema cleanly — eight evolutions, each requiring different conditions (specific stones, friendship levels, time of day, location, move learned), all sharing the same evolution tree. I tried to encode the conditions in the same column the system uses for every other pokemon and it kept producing wrong output. So the Evolution Condition column for the Eeveelutions reads "Go to Master Pokedex Cell Q20." It's a pointer to a manual reference. Knowing where the schema breaks down and not faking structure that isn't there felt better than the alternative.

**What I cleaned up before publishing.** The original lived on my hard drive for years and got iterated on without much hygiene. Before publishing this version I removed an unused named range left over from an earlier design, renamed a couple of named ranges for consistency, deleted an alternate type chart layout I'd kept around but wasn't using, and dropped the "(WIP)" suffix from the Master Pokedex sheet name (it's complete through Generation VIII). The live system is unchanged.

**Provenance.** Built over a weekend in late 2019, when Sword and Shield came out. I shared an earlier version on Reddit at the time. I've grown a bit since then — these days, I'd have probably generated a database with cross-linked tables and used AI to generate a python front-end, instead of using the complex formulas and conditional formatting. But the patterns I used here are the same ones I would use today; the design is good and I haven't found reason to change the thinking behind it. Posting it now because I'm assembling a portfolio, and this is the smallest piece in it that still demonstrates how I think about systems.

The pokemon I built it for, by the way, was Garbodor. I had zero idea what a Garbodor was.
