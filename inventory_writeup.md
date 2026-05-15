# Three Nines on Five Million Dollars of Groceries

I was twenty-three, maybe twenty-four, when I started running inventory accuracy at a regional distribution center for one of the largest wholesale grocery distributors in the country. Still a younger adult, not a kid, but young enough that the gap between the work and the title was wide. The role was technically "Assistant First Shift Supervisor." What it actually was, most days, was forensic accounting on a warehouse floor.

I held the inventory at 99.98% accuracy on about $5 million of stock for about two years. Three nines isn't unheard of in distribution, but it's not common either, and the way I got there isn't the way the textbooks describe it.

The textbook approach to inventory accuracy is some version of "count more carefully, count more often, hold counters accountable." Every variance is treated as a counting error. The fix for variance is a tighter counting process. If your accuracy is bad, you recount. If it's still bad, you recount again, and probably retrain or replace whoever's doing the counting.

That approach treats the count as the unknown and the system's records as the ground truth. The count is what you're trying to get right; the record is what you're checking against.

I did the opposite. I treated the count as the ground truth and the records as the unknown. When the physical count and the system disagreed, my first assumption wasn't that we'd miscounted. It was that something upstream had told the system a lie, and the count was the first place we'd noticed.

That reframe changes everything about how you investigate variance. If you assume miscount, you go look at the counter — was the bin labeled clearly, did they double-count a pallet, did they miss a top shelf. If you assume bad data, you go look at the *pipeline* — the receiving paperwork, the purchase order, the billing record, the item master. The variance isn't the problem. It's a signal that something happened upstream that the system didn't notice. The shelf is just where the contradiction finally surfaced.

Once you start looking that way, you find things you wouldn't otherwise find.

---

The clearest example I have was a cigarette mix-up. Cigarettes in a grocery distribution center are a special category of inventory: small, dense, expensive, theft-prone, and tracked tightly. Newport 100s in particular are a hot ticket item — they move fast, they're high margin, and key retail accounts will absolutely notice if they don't show up.

This started loud. The system said we had sixty half-cases of Newports — eighteen hundred cartons. Picking went looking for them and found zero. Not "fewer than expected," not "off by a pallet" — zero. That's the kind of variance that produces immediate questions about theft, about a missed outbound shipment, about something having gone seriously wrong somewhere in the warehouse.

The investigation traced backward from the stockout. The system said the Newports had been received on a specific date. The receiving paperwork for that date said the same thing — a delivery had come in, signed for, logged. But when you compared what had *actually* arrived that day against what the manifest said and what got entered into the system, the story stopped lining up. A pallet of a cheaper brand had been received as a normal expected delivery, and somebody at data entry had keyed it under the Newport SKU instead of its own.

That one keystroke desynced two products at once. The Newports the system thought we had — we never received. The cheap brand the system didn't know we'd received — was sitting on the shelf, recorded as something it wasn't. Reorders against the cheap brand kept going out because the system saw normal depletion and no replenishment, so over time we'd quietly built an overstock on it too. Once the receiving record was the focus of the investigation, both halves of the error fell out of the same event. One keystroke explained the empty Newport bin and the surplus cheap-brand bin simultaneously.

Cigarettes were not a low-attention category. We did bi-weekly counts on them specifically because the velocity and value were high enough — peak cigarette inventory ran around two million dollars on its own — to justify the attention. Semi-annual full inventory would also have eventually surfaced something, and likely sooner rather than later given the dollar exposure on Newports specifically. So this wasn't an error that hid forever. It was an error with a fuse on it.

But the fuse was running out the wrong way. Tighter counting cadence is a defense against *drift* — gradual variance accumulating between counts. It's not a defense against an identity swap, where both sides of the books stay internally consistent. The cheaper cigarettes had an entire pallet more than they were supposed to have, and we kept reordering more because the inventory said "We're almost out". Newports were running down, and they are a high-volume item. That number, 1,800 cartons... that's not even a week's worth of inventory. We thought we had enough to make it to the next delivery. We did not.

So the cycle-count system, even at bi-weekly cadence on a high-attention category, was going to be the thing that *eventually* caught this — when picking demand for Newports outran the cheap-brand-mislabeled-as-Newport supply, or when a semi-annual full audit cross-checked SKUs against physical product. However, every reorder of the cheap brand was money walking deeper into the wrong bin. The counting infrastructure was robust enough to surface the error eventually. It wasn't designed to surface it *fast*, because it wasn't designed to look for that kind of error at all. Tracing variance back through the pipeline was.

The aftermath was less elegant than the diagnosis. I had to correct the inventory records, then write up a report for the product manager who owned the cigarette category — who freaked out, reasonably, because cigarettes are not a category where you want surprises at this scale. Then I had to write up a second report for my immediate supervisor, the director of operations, who was already freaking out because *why are we out of Newports*, and was now freaking out additionally because the answer was "we never had them, the system has been lying about it for a while, and we've been overbuying a different brand the whole time." We rush-shipped actual Newports, ran special deliveries to the accounts that needed them, and absorbed the price gap and the logistics premium. Not a fun day.

The reason I bring it up isn't that it's an impressive catch. It's that it's a clean example of an error that the standard "count more carefully" methodology *cannot find* on its own. The Newport "count" matched expectations until the moment we needed it. The cheap brand's count would have been written off as drift. Both records were wrong about the same event, in symmetric and opposite ways on two different SKUs. The only way to catch it is to stop treating the records as ground truth and start treating them as evidence that has to corroborate — and to follow contradictions backward through the pipeline to the event that created them.

Why do it my way? Because knowing the root of the problem allows for solutions to be workshopped and created, instead of just not knowing what went wrong and writing it off as a mysterious circumstance.

---

The general pattern I worked from, abstracted out:

Variance is a symptom, not a problem. Treating variance as the problem means you fix symptoms forever and never address causes. Every variance is a question — "what happened upstream that produced this?" — and the answer points to a pipeline error you can fix once and prevent forever. Patching outputs is infinite work. Fixing the input that produces wrong outputs is bounded work.

The records are evidence, not truth. Receiving paperwork, purchase orders, billing records, and item masters are all *claims* about what happened. They were entered by humans, in a hurry, often by humans who weren't the same humans who handled the physical product. They disagree more often than people think. Cross-checking them against each other catches errors that no single record reveals.

The shelf is the integrator. Whatever happened upstream — wrong PO, wrong receiving entry, wrong SKU mapping, wrong billing match — eventually it shows up as a discrepancy between the physical reality and the records. The shelf is the last honest narrator. If you treat the count as ground truth and trace contradictions back through the pipeline, the shelf becomes a diagnostic instrument rather than a problem to be reconciled.

That's it. That's the whole methodology. Three nines on $5M for two years came out of consistently applying that frame to every variance that crossed my desk.

---

Looking back at this work from where I am now, the thing I notice is that the same pattern shows up in everything I've built since.

The analytics infrastructure I built years later at a direct mail facility had the same shape: don't trust the production reports as ground truth, treat them as one record among several, and let contradictions point you to where the data pipeline is lying. The LLM extraction pipeline I built this year has full provenance tracking from output back to character offsets in source text — same idea, same reason, "the record is evidence, not truth, and you need to be able to trace contradictions back to where they originated." Even the hidden-column dispatch layer in [the Pokedex spreadsheet](#) is a version of this: the implementation is allowed to lie about how it gets the answer, but the answer itself has to be traceable to inputs that are real.

I didn't know, at twenty-three, that this was a transferable pattern. I thought I was just doing the inventory job carefully. It took building a few more systems in different domains before I noticed I kept solving the same shape of problem: the visible symptom isn't where the error lives, the records aren't the ground truth they pretend to be, and the work is in tracing contradictions back to where they originated rather than reconciling them where they surface.

The inventory job was the first time I did it. It wasn't the last.
