# Skill: Clinical AI Standards

## Why Clinical AI Is Different
A software bug in a productivity app costs time. A software bug in clinical AI can contribute to patient harm. This changes the risk calculus for every design and engineering decision.

## Explainability Requirements

### What clinicians need to know about an AI finding:
1. **What** was detected (the finding, in clinical language)
2. **Where** it was detected (location in the image, precise)
3. **Confidence** how certain the AI is (percentage or level)
4. **Why** what features contributed to this finding (if possible)
5. **Limitations** what this AI cannot detect or is unreliable for

### Anti-pattern: "AI says abnormal"
A finding like "Abnormal — 87%" is not clinically useful. 
A finding like "Suspected pulmonary nodule, right upper lobe, AI confidence 87%, size: 8mm. Note: AI not validated for detection of nodules <6mm" is clinically actionable.

## Human-in-the-Loop Requirements
Clinical AI should augment, not replace, clinical judgment. Design implications:

- AI findings are suggestions, not diagnoses
- Clinician must be able to accept, reject, or modify any AI finding
- The final report is always the clinician's, not the AI's
- AI cannot prevent a clinician from overriding its output
- Clinician override must be logged with reason (for model improvement)

## Confidence Score Display Standards
- Always show as a range or label, not just a number: "High confidence (87%)" not "0.87"
- Low confidence findings must be visually distinct: different color, opacity, or label
- If confidence is below clinical utility threshold, do not display the finding (or flag it clearly)
- Show the threshold in the UI: "Displaying findings with >70% confidence"

## Alert Fatigue Prevention
Radiologists read hundreds of studies per week. Poorly designed AI increases cognitive load.

Rules:
- Prioritize findings by clinical severity, not AI confidence
- Allow customizable thresholds per user
- Do not flag every finding the same way — severity hierarchy matters
- Provide a "summary" view for common studies and "detailed" view for complex ones
- Track false positive rate per AI model — if it is too high, the AI is creating noise

## Clinical Validation Requirements
Before deploying clinical AI:
- Validation study on representative patient population
- Reported sensitivity and specificity with confidence intervals
- Subgroup analysis (age, sex, ethnicity, equipment type)
- Comparison to radiologist performance
- Known failure modes documented
- Ongoing post-market surveillance plan

## Failure Mode Design
What must happen when the AI fails:
- Model unavailable: clear message, manual review workflow unaffected
- Low quality input (motion artifact, incomplete scan): flag and request repeat
- Out of distribution input (unexpected finding type): flag for senior review
- High uncertainty: present to clinician with explicit uncertainty signal
- System error: never show a technical error to a clinician during reading
