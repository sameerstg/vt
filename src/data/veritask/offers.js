import { OFFER_STATUS } from '@/modules/shared/utils/taskStates';

export const veritaskOffers = [
  {
    id: 'offer-001',
    taskId: 'task-001',
    workerId: 'worker-001',
    amount: 450,
    terms: 'I will provide professional product photography with same-day delivery of edited images. Includes basic retouching and white background processing.',
    status: OFFER_STATUS.PENDING,
    createdAt: '2026-03-18T12:00:00Z',
  },
  {
    id: 'offer-002',
    taskId: 'task-001',
    workerId: 'worker-002',
    amount: 550,
    terms: 'Professional photography service with 24-hour delivery. Includes advanced retouching and multiple format delivery.',
    status: OFFER_STATUS.PENDING,
    createdAt: '2026-03-18T14:30:00Z',
  },
  {
    id: 'offer-003',
    taskId: 'task-002',
    workerId: 'worker-002',
    amount: 200,
    terms: 'Complete deep cleaning service with all supplies included. 100% satisfaction guaranteed.',
    status: OFFER_STATUS.ACCEPTED,
    createdAt: '2026-03-17T16:00:00Z',
  },
  {
    id: 'offer-004',
    taskId: 'task-003',
    workerId: 'worker-003',
    amount: 1400,
    terms: 'I will build a modern, responsive website for your bakery including all pages, contact form, and basic SEO optimization.',
    status: OFFER_STATUS.ACCEPTED,
    createdAt: '2026-03-15T10:30:00Z',
  },
  {
    id: 'offer-005',
    taskId: 'task-004',
    workerId: 'worker-001',
    amount: 800,
    terms: 'Full event photography coverage with 100+ edited photos delivered within 48 hours.',
    status: OFFER_STATUS.ACCEPTED,
    createdAt: '2026-03-10T13:00:00Z',
  },
  {
    id: 'offer-006',
    taskId: 'task-006',
    workerId: 'worker-003',
    amount: 1800,
    terms: 'Complete UI/UX design for your fitness app. Will provide Figma files with all screens and interactive prototypes.',
    status: OFFER_STATUS.PENDING,
    createdAt: '2026-03-19T09:00:00Z',
  },
];

export const getOffersByTask = (taskId) => veritaskOffers.filter(offer => offer.taskId === taskId);
export const getOffersByWorker = (workerId) => veritaskOffers.filter(offer => offer.workerId === workerId);
export const getPendingOffersForTask = (taskId) => getOffersByTask(taskId).filter(offer => offer.status === OFFER_STATUS.PENDING);
