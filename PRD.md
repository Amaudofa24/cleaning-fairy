# Product Requirements Document (PRD)

## Cleaning Fairy — Website & Booking Platform

---

# 1. Product Overview

Cleaning Fairy is a digital-first home cleaning service designed to allow customers to discover, configure, book, pay for, and receive confirmation of a cleaning service without needing to contact a human or use WhatsApp to complete the booking.

The product experience should support a continuous journey:

> Discovery → Landing Page → Booking → Payment → Cleaner Assignment → Cleaning → Review

### Core Product Principle

A customer should be able to discover Cleaning Fairy at 11 PM, book a cleaning for Saturday morning, pay, and go to bed without speaking to a human.

The initial build focuses on:

- Mobile-first customer booking experience
- Lightweight internal admin dashboard
- Cleaner assignment and operational management

---

# 2. Problem Statement

Traditional cleaning-service booking often relies on WhatsApp conversations, manual quotations, back-and-forth communication, and manual scheduling.

This creates friction for customers and operational overhead for Cleaning Fairy.

## Customer Problems

- Customers cannot immediately determine the price of a cleaning.
- Booking may require manual communication.
- Customers may need to wait for confirmation before knowing whether a slot is available.
- Add-on services may require separate conversations.
- Payment may happen outside the booking journey.
- Customers have limited visibility into booking status.

## Business Problems

- Manual booking creates operational overhead.
- Manual pricing increases inconsistent quote risk.
- Static availability can result in overbooking.
- Customer and payment information may be fragmented.
- Recurring bookings are difficult to manage manually.
- Cleaner assignment and booking status require structured workflows.

---

# 3. Product Goals

## Primary Goals

1. Enable customers to complete a cleaning booking without WhatsApp.
2. Provide transparent, dynamically calculated pricing.
3. Allow customers to select available dates and times based on actual cleaner capacity.
4. Enable online payment within the booking flow.
5. Automatically confirm successful bookings.
6. Give operations a central view of bookings, customers, payments, and cleaner assignments.
7. Establish the foundation for recurring cleaning revenue.

---

# 4. Target Users

## 4.1 Customer

A Lagos-based customer looking to book professional home cleaning quickly and conveniently.

### Characteristics

- Likely to discover the service through Instagram or TikTok.
- Primarily uses mobile devices.
- Wants transparent pricing.
- Values convenience and trust.
- Does not want to negotiate over WhatsApp.
- May need one-time or recurring cleaning.

---

## 4.2 Operations/Admin User

Responsible for:

- Monitoring bookings
- Reviewing customer information
- Reviewing payment information
- Assigning cleaners
- Updating booking statuses
- Managing operational exceptions

---

## 4.3 Cleaner

A Cleaning Fairy service provider who receives assigned bookings and performs the cleaning service.

### Phase 1 Scope

- Managed entirely by Admin
- No dedicated cleaner portal

### Future Scope

- Dedicated cleaner interface

---

# 5. Customer Journey

```text
Instagram Ad
      ↓
Landing Page
      ↓
Service Selection
      ↓
Home Details
      ↓
Frequency
      ↓
Add-ons
      ↓
Location
      ↓
Date & Time
      ↓
Customer Details
      ↓
Payment
      ↓
Booking Confirmation
      ↓
Cleaner Assignment
      ↓
Cleaning
      ↓
Quality Check
      ↓
Review
```

### Important Rule

WhatsApp must **not** be required to complete a booking.

WhatsApp may be used for post-booking support.

---

# 6. Website Requirements

## 6.1 Home / Landing Page

### Purpose

Convert visitors into paying customers while clearly communicating the Cleaning Fairy value proposition.

---

## Hero Section

### Headline

**Cleaning Fairy 🧚🏽**

### Subheadline

> We make your space feel brand new.

### Supporting Copy

> Professional home cleaning service.

### Primary CTA

**Book a Cleaning Service**

---

## Supporting Sections

1. What We Clean
2. Pricing
3. How It Works
4. Why Cleaning Fairy
5. Customer Reviews
6. FAQs
7. Final Booking CTA

---

## Requirements

- "Book a Cleaning" is the primary CTA.
- CTA appears in sticky navigation.
- CTA appears in hero section.
- CTA appears near page bottom.
- Copy remains concise.
- Focus on customer outcomes rather than service lists.
- Reviews appear before final CTA.

---

# 7. Booking Flow Requirements

The booking flow consists of nine primary screens:

1. Service Type
2. Home Details
3. Frequency
4. Add-ons
5. Location
6. Date & Time
7. Customer Details
8. Payment
9. Confirmation

Each screen should have one clear primary action.

---

# 7.1 Service Type

### Question

**What do you need cleaned?**

### Options

- Standard Cleaning
- Deep Cleaning
- Move-in / Move-out Cleaning

### Requirements

- Only three core services appear.
- Specialized services appear as add-ons.
- Customer must select one service.
- Selected service is stored with booking.

---

# 7.2 Home Details

### Question

**Tell us about your home**

### Home Size

- Self-contained
- 1 Bedroom
- 2 Bedrooms
- 3 Bedrooms
- 4+ Bedrooms

### Bathrooms

- 1
- 2
- 3
- 4+

### Furnished

- Yes
- No

### Business Rule

These selections feed directly into the pricing engine.

Pricing must not be flat-rate.

---

# 7.3 Frequency

Frequency is collected before payment.

### Options

- One-time
- Weekly
- Every 2 Weeks
- Monthly

### Requirements

- One-time creates a single booking.
- Weekly supports recurring bookings.
- Bi-weekly supports recurring bookings.
- Monthly supports recurring bookings.
- Recurring configuration must be stored.

---

# 7.4 Add-ons

### Question

**Make your cleaning extra magical ✨**

### Initial Add-ons

| Add-on        | Price        |
| ------------- | ------------ |
| Inside Fridge | ₦5,000       |
| Oven Cleaning | ₦5,000       |
| Balcony       | Configurable |
| Windows       | Configurable |
| Compound      | Configurable |

### Requirements

- Each add-on has a defined price.
- Multiple selections allowed.
- Add-ons stored against booking.
- Running total updates instantly.
- Running total remains visible.

---

# 7.5 Location

### Question

**Where should we send your Fairy?**

### Required Information

- Address
- Estate / Building
- Area
- Landmark

### Pricing Rules

Transport fee is calculated automatically based on location.

### Validation

- Location must fall within supported service area.
- Unsupported locations cannot proceed to payment.

---

# 7.6 Date & Time

### Question

**When should your Fairy arrive?**

### UI Components

- Calendar picker
- Time slot picker

### Example Time Slots

- 8:00 AM
- 10:00 AM
- 12:00 PM
- 2:00 PM

### Critical Requirement

Availability must be real-time and based on:

- Date
- Time
- Service type
- Home size
- Cleaning duration
- Cleaner capacity

### Booking Rule

After successful payment:

- Selected slot is reserved
- Double-booking is prevented

---

# 8. Pricing Engine

Pricing is calculated dynamically from customer selections.

## Pricing Inputs

- Service Type
- Home Size
- Bathroom Count
- Furnished Status
- Frequency
- Add-ons
- Location / Transport Fee

### Example Breakdown

| Item              | Amount      |
| ----------------- | ----------- |
| Standard Cleaning | ₦18,000     |
| Transport         | ₦2,000      |
| Oven Add-on       | ₦5,000      |
| **Total**         | **₦25,000** |

### Requirements

- Dynamic updates
- Transparent line items
- Detailed breakdown on payment screen
- No WhatsApp quotation required
- Future admin-configurable pricing

---

# 9. Customer Details

## Required Fields

- Full Name
- Phone Number
- Email Address

## Optional Field

### Anything your Fairy should know?

Examples:

- Please call when you arrive.
- There is a dog in the house.
- 4th floor, no lift.

Notes must be attached to booking records.

---

# 10. Payment

## Provider

- Paystack

## Payment Screen Displays

- Base Service
- Add-ons
- Total Payable

### CTA

**Pay & Confirm Booking**

### Rules

- Booking is not confirmed until payment succeeds.
- Payment status is stored.
- Payment reference is stored.
- Failed payments do not create confirmed bookings.
- Successful payments trigger booking confirmation.

---

# 11. Booking Confirmation

After successful payment, display confirmation immediately.

### Example

> 🧚🏽 Your Cleaning Fairy has been booked!

**Saturday, August 15 · 10:00 AM**
**2 Bedroom Apartment — Lekki Phase 1**
**Booking ID: CF-000128**

> Your cleaner will be assigned shortly.

### CTA

**View My Booking**

### Notifications

- Email Confirmation

---

# 12. Booking Data Model

## Booking

- Booking ID
- Customer ID
- Service Type
- Home Size
- Bathroom Count
- Furnished Status
- Frequency
- Selected Add-ons
- Address
- Estate / Building
- Area
- Landmark
- Date
- Time Slot
- Customer Notes
- Base Price
- Add-on Total
- Final Amount
- Payment Status
- Payment Reference
- Booking Status
- Assigned Cleaner
- Created Timestamp
- Updated Timestamp

---

# 13. Booking Status Lifecycle

```text
Pending Payment
        ↓
Paid
        ↓
Cleaner Assigned
        ↓
Confirmed
        ↓
En Route
        ↓
Cleaning
        ↓
Completed
```

### Requirements

- Admin can update status.
- Status transition rules defined during technical design.

---

# 14. Admin Dashboard

## 14.1 Booking List

### View Columns

- Booking ID
- Customer
- Date
- Time
- Location
- Service
- Amount
- Payment Status
- Cleaner
- Booking Status

### Filters

- Date
- Booking Status
- Payment Status
- Service Type
- Cleaner

---

## 14.2 Cleaner Assignment

Admin can:

1. Open paid booking
2. View booking details
3. View cleaner availability
4. Assign cleaner
5. Save assignment
6. Update booking status

---

## 14.3 Customer & Payment Records

Admin can access:

- Customer Information
- Booking History
- Payment Status
- Payment Reference
- Booking Amount
- Services & Add-ons

---

# 15. Notifications

## Customer Notifications

| Event                               | Channel |
| ----------------------------------- | ------- |
| Booking Paid                        | Email   |
| Booking Confirmed                   | Email   |
| Cleaner Assigned                    | Email   |
| Reminder Before Cleaning            | Email   |
| Cleaning Completed / Review Request | Email   |

Notification timing and templates will be defined during implementation.

---

# 16. Functional Requirements

| ID     | Requirement                                     | Priority    |
| ------ | ----------------------------------------------- | ----------- |
| FR-001 | Customer can select a cleaning service          | Must Have   |
| FR-002 | Customer can provide home details               | Must Have   |
| FR-003 | System calculates price from home details       | Must Have   |
| FR-004 | Customer can select booking frequency           | Must Have   |
| FR-005 | Customer can select add-ons                     | Must Have   |
| FR-006 | System recalculates total dynamically           | Must Have   |
| FR-007 | Customer can enter service location             | Must Have   |
| FR-008 | Customer can select date                        | Must Have   |
| FR-009 | System displays only available time slots       | Must Have   |
| FR-010 | Customer can provide contact details            | Must Have   |
| FR-011 | Customer can make online payment                | Must Have   |
| FR-012 | System creates booking after successful payment | Must Have   |
| FR-013 | System generates unique booking ID              | Must Have   |
| FR-014 | Customer receives booking confirmation          | Must Have   |
| FR-015 | Admin can view bookings                         | Must Have   |
| FR-016 | Admin can assign cleaners                       | Must Have   |
| FR-017 | Admin can update booking status                 | Must Have   |
| FR-018 | Admin can view customer/payment records         | Must Have   |
| FR-019 | System supports recurring booking configuration | Should Have |

---

# 17. Non-Functional Requirements

## Performance

- Fast page loads on mobile networks.
- Instant pricing updates.
- No manual refresh after payment.

## Responsiveness

- Mobile-first.
- Responsive across devices.
- Works on modern browsers.

## Reliability

- Accurate availability.
- Reliable payment webhooks.
- Idempotent booking creation.

## Security

- Protect customer information.
- Payment handled by payment provider.
- Admin authentication required.
- Role-based access controls.

## Auditability

Track:

- Booking creation time
- Payment references
- Status changes
- Cleaner assignments
- Relevant timestamps

---

# 18. Error & Exception Handling

## Payment Failure

> Payment was unsuccessful. Your booking has not been confirmed.

Allow retry.

---

## Slot Unavailable

> This time slot is no longer available. Please select another available time.

---

## Unsupported Location

> Cleaning Fairy is not currently available in this area.

---

## Invalid Customer Information

- Highlight affected fields.
- Explain required correction.

---

## System Error

Provide a friendly support route without forcing WhatsApp.

---

# 19. Success Metrics

## Customer Experience

- Bookings completed without WhatsApp.
- High booking completion rate.
- Low payment failure rate.
- Low abandonment.
- Strong satisfaction.

## Business

- Increasing online bookings.
- Increasing repeat bookings.
- Increasing recurring bookings.
- Increasing average order value.
- Reduced manual workload.

## Operations

- Low double-booking rate.
- High cleaner assignment rate.
- High on-time arrival rate.
- Accurate records.

---

# 20. MVP Scope

## Customer Facing

- Landing Page
- Service Selection
- Home Details
- Frequency
- Add-ons
- Location
- Dynamic Pricing
- Availability
- Customer Details
- Payment
- Confirmation

## Admin

- Booking List
- Booking Details
- Cleaner Assignment
- Status Updates
- Customer Records
- Payment Records

## Integrations

- Payment Gateway
- Email Provider
- SMS Provider

---

# 21. Acceptance Criteria

The MVP is launch-ready when:

- Customer can access website on mobile.
- Customer can select supported services.
- Customer can enter home details.
- Pricing is calculated dynamically.
- Customer can select frequency and add-ons.
- Total updates in real time.
- Customer can enter supported service location.
- Only valid time slots are displayed.
- Customer can enter contact details.
- Customer can pay online.
- Successful payment creates one booking.
- Unique booking ID is generated.
- Customer receives immediate confirmation.
- Notifications are triggered.
- Admin can view bookings.
- Admin can assign cleaners.
- Admin can update statuses.
- Customer and payment information are accessible.
- Entire booking journey can be completed without WhatsApp.

---

**End of PRD**
