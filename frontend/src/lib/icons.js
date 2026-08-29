// Maps the icon name strings stored in content_blocks (DB/admin) to actual
// lucide-react components, so the CMS can store simple string keys.
import {
  Car, Home as HomeIcon, Plane, HeartPulse, Flame, Ship, HardHat, Scale,
  Users, Package, PhoneCall, FileText, Search, CheckCircle, ShieldCheck,
} from "lucide-react";

export const iconMap = {
  Car, HomeIcon, Plane, HeartPulse, Flame, Ship, HardHat, Scale,
  Users, Package, PhoneCall, FileText, Search, CheckCircle, ShieldCheck,
};

export function getIcon(name, fallback = ShieldCheck) {
  return iconMap[name] || fallback;
}
