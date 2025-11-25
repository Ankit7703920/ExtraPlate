import { config } from 'dotenv';
config();

import '@/ai/flows/generate-donation-title.ts';
import '@/ai/flows/summarize-donation-details.ts';
import '@/ai/flows/veg-non-veg-classifier.ts';
