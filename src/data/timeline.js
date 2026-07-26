import { gallery } from "@/data/gallery";

const [city, campusRoad, sky, , tracks, , leaves] = gallery;

export const timeline = [
  {
    year: "2021",
    title: "A Borrowed Camera",
    text: "First year of B.Tech, a friend's entry-level DSLR, and one frame that quietly rearranged my priorities.",
    image: campusRoad.src,
    w: campusRoad.w,
    h: campusRoad.h,
    alt: campusRoad.alt,
  },
  {
    year: "2023",
    title: "First Paid Shoot",
    text: "Shot a friend's pre-wedding on a hostel budget — one prime lens, no strobes, and a very long edit night.",
    image: sky.src,
    w: sky.w,
    h: sky.h,
    alt: sky.alt,
  },
  {
    year: "2024",
    title: "Campus Photographer",
    text: "Became the official lens behind the college fest — 20,000 frames across three sleepless days.",
    image: tracks.src,
    w: tracks.w,
    h: tracks.h,
    alt: tracks.alt,
  },
  {
    year: "2026",
    title: "Final Year, Full Portfolio",
    text: "Engineering degree nearly done, sixty shoots deep — still the same approach: wait, watch, one frame.",
    image: city.src,
    w: city.w,
    h: city.h,
    alt: city.alt,
  },
];
