'use server';
/**
 * @fileOverview This file defines a Genkit flow to classify food donations as either Veg or Non-Veg.
 *
 * The flow takes a title and description of a donation as input and uses an LLM to classify it.
 * It exports:
 *   - `classifyVegNonVeg` - The function to call to classify a donation.
 *   - `VegNonVegClassifierInput` - The input type for the classifyVegNonVeg function.
 *   - `VegNonVegClassifierOutput` - The return type for the classifyVegNonVeg function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const VegNonVegClassifierInputSchema = z.object({
  title: z.string().describe('The title of the food donation.'),
  description: z.string().describe('The description of the food donation.'),
});
export type VegNonVegClassifierInput = z.infer<typeof VegNonVegClassifierInputSchema>;

const VegNonVegClassifierOutputSchema = z.object({
  category: z.enum(['Veg', 'Non-Veg']).describe('The classification of the food donation as either Veg or Non-Veg.'),
});
export type VegNonVegClassifierOutput = z.infer<typeof VegNonVegClassifierOutputSchema>;

export async function classifyVegNonVeg(input: VegNonVegClassifierInput): Promise<VegNonVegClassifierOutput> {
  return classifyVegNonVegFlow(input);
}

const classifyVegNonVegPrompt = ai.definePrompt({
  name: 'classifyVegNonVegPrompt',
  input: {schema: VegNonVegClassifierInputSchema},
  output: {schema: VegNonVegClassifierOutputSchema},
  prompt: `You are an AI assistant that classifies food donations as either Veg or Non-Veg based on their title and description.

  Title: {{{title}}}
  Description: {{{description}}}

  Classify the food donation as either Veg or Non-Veg.
  Return the classification in JSON format.
`,
});

const classifyVegNonVegFlow = ai.defineFlow(
  {
    name: 'classifyVegNonVegFlow',
    inputSchema: VegNonVegClassifierInputSchema,
    outputSchema: VegNonVegClassifierOutputSchema,
  },
  async input => {
    const {output} = await classifyVegNonVegPrompt(input);
    return output!;
  }
);
