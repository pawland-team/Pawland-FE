import { StaticImageData } from 'next/image';

export interface MainBannerArray {
  id: number;
  title: string;
  description: string;
  imageSrc: StaticImageData;
  buttonText?: string;
}
