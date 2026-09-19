# Content Verification Log

Zero-fabrication policy: ship only what is confirmed; flag the rest.

## Verified (from official Amaltas sources)
- Institution: Amaltas Super Speciality Hospital / Amaltas Institute of Medical
  Sciences (AIMS), Village Bangar, Dewas–Ujjain Highway, Dewas, MP 455001.
- Campus ~27.38 acres; NABH-accredited; 24×7 emergency.
- Contact: Toll Free 1800-571-2120; +91 97524 47834; landline 07272-482500.
- 8 publicly-listed doctors (see `src/data/doctors.ts`).
- 12 specialty departments (see `src/data/specialties.ts`).

## Requires verification before launch
- Doctor optional fields (experience, languages, expertise, consultation hours).
- Any statistic beyond campus size / NABH / 24×7 (e.g. bed counts, volumes).
- All articles/news/events (currently `sample: true`).
- Any accreditation other than NABH.

## Must not ship without consent
- Patient testimonials (`consentOnFile` required). Currently empty by design.
