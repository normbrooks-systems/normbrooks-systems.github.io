# What Conventional Wisdom Doesn't Know About Your Machine

In 2019, I was an operator at Innovairre running a Pitney Bowes FlowMaster, which is a mid-speed envelope inserter for mass mailing. The specifics of this machine aren't really needed for this story, other than the fact that there were assumptions about how the work was produced that were based around a fundamental misunderstanding of how the machine vision matching system worked, and this fundamental misunderstanding is that a FlowMaster could not have the envelope be machine read while in operation.

The job had a second operator stationed at the output. Their job was to QC the finished pieces. The way it worked — the way the role was defined for everyone in that seat — was to grab a piece off the belt, pop the flap before the glue dried, look inside, verify that the insert matched the carrier, reseal it if it was good, and stop the machine if it wasn't.

The handbook said to check every five pieces. The handbook was wrong about what that meant in practice, and the practice was wrong about what the handbook said.

I want to be honest about how this got fixed, because the framing matters. I wasn't trying to be a hero. I was annoyed.

---

A FlowMaster, well-maintained, can run 13,000 pieces per hour. Realistic numbers at our facility for jobs without complex QC were 6,500 to 8,000. On this run, I was deliberately holding the machine at 4,000 — slightly more than a piece per second — to give the QC operator time to do their checks. Even at that throttled rate, the work was a struggle for the person at the output. Pop a flap, eyeball the insert, eyeball the carrier, reseal — about three seconds when done by a skilled operator, and I was happy as long as it was happening every fifteen seconds or so. A skilled operator could clear the handbook benchmark of one piece in five matching, at roughly 4 and a half seconds per verification. The people actually placed here fell short, be it due to lack of skill or experience.

The intent of that rule was to sample one of every five pieces as it comes off the machine, while the glue is still wet, because wet glue lets you reopen the flap and reseal it cleanly. As I said before, that's doable by a skilled operator with the three-second loop time. Also stated above, the actual inhabitants of the hot seat could not usually hit that. The benchmark was set against skilled operators, which left a lot to be desired in practice. Most QC operators couldn't keep up with it, and the ones who couldn't keep up adapted to the situation in the way you'd expect.

What they did was treat "every five" as a *position* count rather than a *time* count. They'd do their check, count five pieces forward on the belt, and grab whatever was sitting there now. Which, by the time they reached for it, was four or five pieces deep into already-dried glue. So the check went from "pop a wet flap and reseal" to "fight a sealed envelope without destroying the carrier." The fight took longer than the check should have. While they fought, the next "every five" came around even further behind real-time. The backlog compounded.

Because I was seen as just an operator, and many of these people were either short-term temporary assignments or long-term operators from other departments not familiar with mailshop operations, my telling them to pull from the exit instead of every 5 pieces lasted as long as I watched them. As soon as I turned my back, they started doing it by the book again, setting me up for the failure mode detailed below.

---

When the QC step found a mismatch, the recovery wasn't "pull the bad piece, restart." The mismatch was the most recent piece — the one in the operator's hand. The actual problem was that somewhere upstream, the inserter had gotten out of sync with the carrier feed, and *every piece sealed since the desync* had wrong contents.

So the recovery was: stop the line. Work backward through the sealed pieces on the sort table to find where the desync started. Open every wrong envelope without destroying the carrier, because the carrier was already printed, addressed, and could not be replaced without reprinting. Pull the wrong inserts. Sort them against the recipients they were supposed to go to. Put the right inserts in. Reseal with glue sticks, because the original adhesive was spent.

When the QC operator was attentive and grabbed pieces off the machine in real time, a desync got caught within a few pieces. Five, ten, manageable. When the operator was running on the belt-position method, the desync got caught after 30 or 50 or 60 pieces had piled up. At 4,000 per hour, every minute of inattention is 67 sealed pieces.

Cooperative QC operators and I could fix 50 to 60 pieces in about 10 minutes. The trick was working backward in order, opening pieces one at a time, keeping the inserts and carriers paired by position on the table, finding the boundary, then matching forward from there. Other QC operators would just start ripping envelopes open and dumping inserts into a pile. Thirty to forty minutes of 52-card-pickup, played with sealed mail, while the machine stood idle. They'd look at me with a hangdog expression like I was the one being unreasonable.

I got really good at opening sealed carriers without destroying the flaps. Pilot Precise V5 rolling-ball pen, used backward as a flap lifter — the print wears completely off the barrel from holding it the same way too many times. I still have one in that condition. There are a handful of jobs that come through the facility now where the camera can't help — blind matches, where the carrier has no machine-readable identifier on it — and on those jobs the skill is real labor against a real constraint. The pen has its applications. It just stopped being applied to problems the equipment was already capable of solving.

I want to be clear that camera-caught mismatches aren't free either. When the machine stops, I had to fix a handful of pieces manually, and either put them back into the machine or seal them by hand, but the difference is 2-3 packages vs 50 packages. One time I had the match desync by 100 pieces before the helper caught the issue. A bounded recovery on empty carriers at the machine is qualitatively different from a surgical reconstruction of finished mail on the sort table. Both cost time. They don't cost the same time.

---

The machine vision matching system in place uses cameras set up to read 2D barcodes, similar to QR codes. Typically speaking, the flowmasters only had jobs that read pieces in the track and then either put them into a windowed envelope or a closed-face blank envelope to be printed on inline. This machine had been set up with one of these systems. These systems had a mismatch stop set up as well. When the barcodes didn't match, the machine stopped. We'd always used the match system to catch these mismatches in the track for printed job, but never for a job with preprinted carriers.

Conventional wisdom said you couldn't read a carrier on a FlowMaster. Other machines in the facility could do carrier reads — that wasn't the question. The question was whether this specific machine, with its specific transport architecture, could be made to do it. Everyone had decided no, and "no" had hardened into something nobody re-examined. Conventional wisdom is borne from conventional thoughts, and conventional thoughts about an unconventional question produce a "no" that has the shape of an answer without doing any of the work of one.

I went and looked at the machine.

I walked up to my supervisor, two hours into the shift, and told him: "If you give me two hours, I'll beat first and second shift's combined number on this machine by end of shift." He gave me the two hours. He gave them to me because I had a track record of saying things like that and following through. The conversation wasn't an engineering review. It was a trust-ledger transaction. Floor-level engineering happens on trust ledgers, and the trust ledger was real.

In those two hours, I jury-rigged a mount under the carrier conveyor — the chain-conveyor module that drags carriers along their edges toward the merge. I relocated one of the three cameras to that mount, with its trigger cable and its data cable. The carriers run through that section face-down, with part of the top face exposed underneath. The 2D barcode was already printed in the upper-right corner of the carrier — the spot where the stamp would later cover it, which is why nobody seeing the finished piece would know it was there. An upward-facing camera mounted under the conveyor reads that barcode as the carrier passes overhead, before it reaches the merge. The trigger came from the FlowMaster's onboard encoder, because the carrier was at a known position relative to the cycle every cycle.

I configured the camera. I ran a few test pieces. The reads were clean. I started the run.

The QC operator helping me that night went back to running the machines she was actually skilled at. She was a competent operator on a lower-complexity line, and her department had been short because she'd been parked on this seat doing a job she couldn't effectively keep up with. With the seat eliminated, she went and did the work she was good at, which kept her own department from backing up. Nobody on the floor lost hours over what I changed.

I beat first and second shift's combined number by end of shift.

Within twelve hours, the scheduler saw what the machine was actually doing and reduced the job from three FlowMasters to one. The other two machines and five operators were freed up for other work. The weekend overtime that had been on the schedule for this job didn't need to happen — Saturday and Sunday cleared. The cascade kept going for about a week as the scheduling effects propagated.

---

The machine's mechanical capability didn't change. What changed was the constraint downstream of it. The 4,000-per-hour cap I'd been holding to existed to accommodate the human QC pacing. With the camera as the gate, the cap went away, and the machine ran at the rate it was designed for. The per-machine throughput number — the 4x figure that goes on a resume — is downstream of removing the constraint, not downstream of any speed improvement.

The per-machine number is also the smallest part of the story. Three machines became one because the scheduler saw what one was now capable of. Five operators went from running this job to running other things. Weekend overtime that had been on the schedule simply didn't need to happen. The actual effect wasn't "this machine ran 4x faster"; it was "the capacity this job consumed dropped enough that the schedule reorganized itself around the new reality." The 4x number is the part that fits on a resume. The cascade is the part that mattered to the operation.

I didn't invent a placement. I just noticed that "you can't read a carrier on a FlowMaster" was an assertion nobody had actually pressure-tested. The geometry was right there. The cameras were right there. The capability was right there. What was missing was anyone willing to walk up to the machine with the question "okay, but *can* we?" instead of inheriting the answer that came with the role.

I didn't write new software either. The configuration files supported what I needed. I just moved a couple of wires.

The thing I keep coming back to about this story is how much of it was already true before I touched anything. The cameras existed. The stop circuit existed. The barcode on the carrier existed, in a spot that was readable from below, because the barcode had to go somewhere and the stamp area was a convenient place to hide it. The encoder existed. The configuration software existed. The labor cost of the human QC method existed. The reconstruction-after-desync labor cost existed. All of these were facts about the operating environment that anyone could have observed. The only thing I added was the willingness to look at all of them at once and ask whether the conventional answer about this particular machine was load-bearing or just inherited.

It was inherited. Conventional wisdom has its uses, but it is not engineering. Engineering is going up to the thing in front of you and looking at it.

The placement I jury-rigged that day became the SOP for that machine. A few people pushed back on it at first, but it stuck. The exact mount point evolved over time toward more safety-minded locations, but the architecture didn't change. The QC seat for runs of that type stopped being a seat. The handbook rule is, presumably, still "check every five pieces" on the runs where it still applies. I'm not in a position to fix the handbook. But I'm in a position, sometimes, to make a job not need the rule.

The pen with the worn-off print is still in my desk. It still gets used.
