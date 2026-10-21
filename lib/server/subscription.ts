import prisma from "@/lib/server/prisma";
import { SubscriptionStatus } from "@/generated/prisma/client";

const GRACE_DAYS = 3;
const DAY_MS = 24 * 60 * 60 * 1000;

export async function getSubscriptionAccess(userId: string) {
  const sub = await prisma.subscription.findUnique({ where: { userId } });

  if (!sub || !sub.currentPeriodEnd) {
    return { hasAccess: false, status: sub?.status ?? null };
  }

  const now = Date.now();
  const end = sub.currentPeriodEnd.getTime();

  let hasAccess = false;

  switch (sub.status) {
    case SubscriptionStatus.ACTIVE:
    case SubscriptionStatus.CANCELLED: // cancelled, but paid until period end
      hasAccess = end > now;
      break;
    case SubscriptionStatus.PAST_DUE: // short grace period after a failed renewal
      hasAccess = end + GRACE_DAYS * DAY_MS > now;
      break;
    case SubscriptionStatus.PENDING:
    case SubscriptionStatus.EXPIRED:
    default:
      hasAccess = false;
  }

  return { hasAccess, status: sub.status };
}

export async function hasActiveSubscription(userId: string) {
  return (await getSubscriptionAccess(userId)).hasAccess;
}
