---
title: "Ruby Performance Optimization: Why Ruby Is Slow, and How to Fix It"
author: "Alexander Dymo"
coverImage: "./_images/ruby-performance.png"
rating: 4
startDate: 2026-02-01
endDate: 2026-03-07
addedDate: 2026-03-08
category: "tech"
review: "The definitive Ruby performance bible. Core insight: 80% of slowness comes from memory and GC, not algorithms. Published in 2015 but the mindset is timeless."
lang: "en"
---

**Ruby Performance Optimization** by Alexander Dymo is the first comprehensive resource to consolidate all Ruby performance knowledge into a single source. The author brings over 8 years of hands-on experience optimizing Ruby/Rails applications in real production environments.

On Goodreads, the book holds a **4.07/5** rating from 55 reviews — not a blockbuster number, but those who have read it rate it highly.

---

## The Core Mindset: Why Is Ruby Slow?

Before reading this book, I — like many developers — assumed Ruby was slow because it's "interpreted" or "not C++". Dymo completely overturns that assumption.

**The book's central thesis:** Ruby is not slow because of algorithms or language architecture. Ruby is slow because of **excessive memory consumption**, which forces the Garbage Collector (GC) to trigger constantly — potentially consuming more than **50% of a program's execution time**.

Dymo's golden rule:

> *"What is not allocated does not need to be collected."*

This mindset fundamentally changes how you look at Ruby code. Instead of asking "is this code correct?", you'll start asking "how many unnecessary objects does this create?"

---

## Chapter-by-Chapter Breakdown

### Chapter 1 — What Makes Ruby Code Fast?

The opening chapter builds the **Performance Mindset**. Dymo presents the 80/20 rule: 80% of performance improvements come from memory optimization, the other 20% from everything else.

Key insight: a program that manages memory well will run fast on **every version of Ruby**, regardless of whether a newer GC is available.

### Chapter 2 — Fixing Common Performance Mistakes

The most hands-on chapter in the first section. Specific techniques include:

- **String optimization:** Use "bang" methods (`gsub!`, `downcase!`) and the `<<` operator to mutate strings in-place, avoiding unnecessary copies.
- **File reading line by line:** Replace `File.read` (loads entire file into RAM) with `each_line` or `gets` to dramatically reduce peak memory.
- **Beware of Closures:** Proc/lambda objects can hold references to the entire execution context, silently causing memory leaks.
- **Choose iterators carefully:** Some iterators like `each_with_index` create more temporary objects than you'd expect — be deliberate inside large loops.
- **Push heavy work outside Ruby:** Handle intensive computation at the database layer (SQL) or use C-extension gems instead of pure Ruby.

### Chapter 3 — Making Rails Faster

This chapter focuses on Rails — the environment most Ruby developers work in daily.

**ActiveRecord** is the biggest memory consumer. Principles:
- Only `select` the columns you actually need.
- Use `includes` to prevent N+1 queries.
- Use `find_each` (batch processing) instead of loading thousands of records at once.

**Action View:** Rendering partials inside a loop is expensive because each iteration initializes a new template object. Solution: `render collection: @objects` lets Rails initialize the template only once.

### Chapter 4 — CPU Profiling

The golden rule when profiling: **disable GC before running a CPU profiler** to eliminate noise from GC running at random intervals.

Tools: `ruby-prof` + `KCachegrind` to visualize Call Graphs. The book walks through reading three report types: Flat (lists the slowest methods), Graph (call relationships), and Call Stack (execution tree).

### Chapter 5 — Learning to Optimize with a Profiler

A hands-on chapter following this iterative workflow: **Write Test/Benchmark → Profile → Hypothesize → Optimize → Re-profile**.

Key lesson: not every optimization works. Sometimes you need to restructure code at a higher level — like removing Regex, handling strings manually — to achieve real gains. The book's worked example achieves a **4.7x speedup** after optimizing in the right place.

### Chapter 6 — Memory Profiling

Introduces `Valgrind Massif` and `Stackprof` for tracking heap usage over time. Also covers using `GC#stat` — Ruby's internal API — to understand what the GC is doing behind each request.

### Chapter 7 — Measuring Correctly

How do you ensure benchmark results are trustworthy? Dymo covers eliminating external factors (OS cache, I/O) and applying basic statistics (standard deviation, confidence intervals) to distinguish genuine improvements from random noise.

### Chapter 8 — Performance Testing

Optimizing once is not enough. Dymo walks through writing **automated performance tests** (using the `assert-performance` gem) to ensure future code changes don't cause regressions. The section on tracking SQL query counts inside integration tests is particularly practical.

### Chapter 9 — Thinking Outside the Box

Three interesting infrastructure-level techniques:
- **Process cycling:** Restart processes periodically when accumulated memory gets too high.
- **Forking:** Run heavy tasks in a child process; once done, all memory is immediately returned to the OS.
- **Out-of-Band GC (OOBGC):** Run GC when the server is idle, avoiding interruptions during active request processing.

### Chapter 10 — Garbage Collector Tuning

Deep-dives into Generational GC introduced in Ruby 2.1+. Covers tuning environment variables like `RUBY_GC_HEAP_GROWTH_FACTOR` to optimize GC behavior for your application's specific workload.

---

## Strengths

- **Comprehensive and systematic:** The first book to consolidate all Ruby optimization knowledge into one source.
- **Highly practical:** Techniques drawn from years of real-world experience, not academic theory.
- **Clear learning path:** Guides readers from "performance rookie" to "performance expert" in logical steps.
- **Mindset shift:** After reading, you'll instinctively think about memory allocation every time you write Ruby.

## Weaknesses

- **Published in 2015:** Some content on GC internals (particularly environment variables) may be inaccurate for Ruby 3.x. However, the core mindset and general principles remain fully valid.
- **Covers Ruby 1.8:** Some examples reference old versions, making certain sections feel historical rather than immediately practical.
- **Not universally applicable:** Some techniques only make sense when you're processing large datasets or handling high traffic.

---

## Community Reviews

| Reviewer | Review |
|---|---|
| Jeffrey Dill | "Not everything will be useful to you, but this is a **must-read** for any Ruby developer." |
| Johnny | "Great book. Top tip: reduce memory allocation — what is not allocated doesn't need to be collected." |
| Matthias | "Solid book, a great starting point for the topic. Well worth the price." |
| Matt Margolis, Getty Images | "A must-have for anyone bringing performance-sensitive Ruby programs to production." |

---

## Who Should Read This?

This book is best suited for **intermediate to advanced Ruby/Rails developers** dealing with real performance problems in production: high server costs, slow response times, or memory usage that grows over time.

If you're new to Ruby, come back after at least 1–2 years of hands-on experience — the book will be far more meaningful once you've felt the pain of a sluggish Rails app firsthand.

The eBook is available on Pragmatic Bookshelf for approximately **$19–$31 USD**.
