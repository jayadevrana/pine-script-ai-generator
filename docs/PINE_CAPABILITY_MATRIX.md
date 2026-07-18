# Pine Capability Matrix

This matrix maps Pine Script v6 features and patterns to product relevance, implementation risk, and validation needs.

| Capability | Relevance | Difficulty | Typical Bugs | Best Abstraction | User-Facing Setting | Visual Validation | Backtest Validation |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Execution model and `bar_index` | Both | Low | Future leakage, wrong bar numbering | Explain bar order and state persistence | No | Yes | Yes |
| Type system | Both | Medium | Series/simple mismatch | Typed wrappers and strict inputs | Hidden | No | Yes |
| Arrays | Both | Medium | Wrong indexing, bounds errors | Helper functions around size and access | Rarely | Sometimes | Sometimes |
| Matrices | Both | High | Oversized structures, bad indexing | Thin typed wrappers | No | No | Rare |
| Maps | Both | Medium | Invalid keys, ordering assumptions | Typed key helpers | No | No | Rare |
| UDTs | Both | Medium | Uninitialized fields, mutable confusion | Factories and clear defaults | Hidden | No | Rare |
| Methods and functions | Both | Medium | Bad signatures, inconsistent style | Common utility library | Sometimes | No | No |
| Loops and performance | Both | High | Runtime overages, dynamic requests | Small bounded loops | Hidden | Sometimes | Yes |
| Bar-state handling | Both | Low | Historical/realtime divergence | Reusable state guards | Hidden | Yes | Yes |
| `request.security()` and MTF | Both | High | Repaint, invalid dynamic requests | Centralized MTF wrapper | Often | Yes | Yes |
| Plotting | Both | Low | Clutter, wrong pane, bad colors | Shared plot config layer | Yes | Yes | No |
| Drawings (`label`, `line`, `box`, `table`) | Both | Medium | Object leaks, resource limits | Drawing lifecycle module | Sometimes | Yes | Rare |
| `strategy.entry()` | Strategy | Low | Bad IDs, wrong size | Entry builder helpers | Yes | No | Yes |
| `strategy.exit()` | Strategy | High | Duplicate IDs, wrong quantity splits | Exit-plan builder | Yes | Sometimes | Yes |
| Stop-loss modes | Strategy | Medium | Unit conversion errors | Risk module | Yes | Yes | Yes |
| Target modes | Strategy | Medium | Wrong RR calculations or ordering | Target calculator helpers | Yes | Yes | Yes |
| Break-even and trailing | Strategy | Medium | Late or early stop movement | Dedicated management module | Yes | Yes | Yes |
| Pyramiding | Strategy | Medium | Conflicting entries | Limit-aware position module | Yes | No | Yes |
| Session filters | Both | Low | Session string and timezone mistakes | Session presets | Yes | Yes | Yes |
| Alerts and payloads | Both | Medium | Missing conditions or poor messages | Alert builder | Yes | No | No |
| Dashboard overlays | Both | Medium | Table clutter and object limits | Dashboard spec and renderer | Yes | Yes | No |
| Combined request and session filters | Both | Medium | No-trade conflicts | Cross-filter validation | Yes | Yes | Yes |
| Anti-repaint patterns | Both | High | Future leakage, bad HTF alignment | Safe defaults and wrappers | Hidden | Yes | Yes |
| Code organization and style | Both | Medium | Duplication and spaghetti code | Module boundaries and naming rules | Hidden | No | Yes |

## Notes

- High-difficulty features deserve the most training and validation attention.
- Features with both high difficulty and high strategy impact should drive benchmark design.
- User-facing options should be exposed progressively, with safe defaults for beginners.

