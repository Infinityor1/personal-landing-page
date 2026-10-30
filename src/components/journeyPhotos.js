// =========================================================================
// POLAROID CAMERA PICTURES CONFIGURATION (Batches of 3 per Location)
// -------------------------------------------------------------------------
// Attach your pictures here! You can use:
//   1. Files in the public directory:
//        src: "/photos/my-photo.jpg" (put file in public/photos/)
//   2. Assets imported into this file:
//        import photo1 from "../assets/myPhoto.jpg";
//        src: photo1
//   3. External web URLs:
//        src: "https://example.com/photo.jpg"
//
// Leave `src: ""` to display the vintage Polaroid instant film frame.
// =========================================================================
import CLHSClass from '../assets/CLHSClass.jpeg';
import SPM from '../assets/SPM.png';
import CLHSHarmonica from '../assets/CLHSHarmonica.jpg';
import KMKGrad from '../assets/kmkGrad.jpg';
import KMKHostel from '../assets/kmkHostel.jpg';
import MUET from '../assets/muet.png';
import KUAYUE from '../assets/Kuayue.JPG';
import YLS from '../assets/Yaolanshou.jpg';
import ArduinoTalk from '../assets/ArduinoTalkSpeaker.JPG';

export const DEFAULT_JOURNEY_PHOTOS = {
  location1: [
    {
      id: "loc1-polaroid-1",
      src: CLHSClass,
      alt: "Location 1 - Memory 1",
      caption: "Classmates!",
      date: "2020",
    },
    {
      id: "loc1-polaroid-2",
      src: SPM,
      alt: "Location 1 - Memory 2",
      caption: "SPM Certification",
      date: "2023",
    },
    {
      id: "loc1-polaroid-3",
      src: CLHSHarmonica,
      alt: "Location 1 - Memory 3",
      caption: "Harmonica Club",
      date: "2019",
    },
  ],
  location2: [
    {
      id: "loc2-polaroid-1",
      src: KMKGrad,
      alt: "Location 2 - Memory 1",
      caption: "Graduation",
      date: "2024",
    },
    {
      id: "loc2-polaroid-2",
      src: KMKHostel,
      alt: "Location 2 - Memory 2",
      caption: "College Hostel",
      date: "2024",
    },
    {
      id: "loc2-polaroid-3",
      src: MUET,
      alt: "Location 2 - Memory 3",
      caption: "MUET 5+",
      date: "2024",
    },
  ],
  location3: [
    {
      id: "loc3-polaroid-1",
      src: ArduinoTalk,
      alt: "Location 3 - Memory 1",
      caption: "Arduino Talk Speaker",
      date: "2026",
    },
    {
      id: "loc3-polaroid-2",
      src: KUAYUE,
      alt: "Location 3 - Memory 2",
      caption: "Concert Performer",
      date: "2026",
    },
    {
      id: "loc3-polaroid-3",
      src: YLS,
      alt: "Location 3 - Memory 3",
      caption: "Songwriting",
      date: "2026",
    },
  ],
};
