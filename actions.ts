'use server';

import { generateDonationTitle } from '@/ai/flows/generate-donation-title';
import { summarizeDonationDetails } from '@/ai/flows/summarize-donation-details';
import { classifyVegNonVeg } from '@/ai/flows/veg-non-veg-classifier';

export async function generateTitleAction(description: string) {
  if (!description) {
    return { success: false, error: 'Description is required to generate a title.' };
  }
  try {
    const result = await generateDonationTitle({ description });
    return { success: true, title: result.title };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed to generate title.' };
  }
}

export async function summarizeDetailsAction(description: string) {
    if (!description) {
        return { success: false, error: 'Description is required to generate a summary.' };
    }
  try {
    const result = await summarizeDonationDetails({ description });
    return { success: true, summary: result.summary };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed to generate summary.' };
  }
}

export async function classifyFoodAction(title: string, description: string) {
    if (!title || !description) {
        return { success: false, error: 'Title and description are required to classify food.' };
    }
  try {
    const result = await classifyVegNonVeg({ title, description });
    return { success: true, category: result.category };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed to classify food.' };
  }
}
