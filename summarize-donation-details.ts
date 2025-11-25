'use server';
/**
 * @fileOverview Summarizes the details of a donation.
 *
 * - summarizeDonationDetails - A function that summarizes donation details.
 * - SummarizeDonationDetailsInput - The input type for the summarizeDonationDetails function.
 * - SummarizeDonationDetailsOutput - The return type for the summarizeDonationDetails function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeDonationDetailsInputSchema = z.object({
  description: z.string().describe('The full description of the donation.'),
});
export type SummarizeDonationDetailsInput = z.infer<
  typeof SummarizeDonationDetailsInputSchema
>;

const SummarizeDonationDetailsOutputSchema = z.object({
  summary: z
    .string()
    .describe('A concise summary of the donation description.'),
});
export type SummarizeDonationDetailsOutput = z.infer<
  typeof SummarizeDonationDetailsOutputSchema
>;

export async function summarizeDonationDetails(
  input: SummarizeDonationDetailsInput
): Promise<SummarizeDonationDetailsOutput> {
  return summarizeDonationDetailsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeDonationDetailsPrompt',
  input: {schema: SummarizeDonationDetailsInputSchema},
  output: {schema: SummarizeDonationDetailsOutputSchema},
  prompt: `Summarize the following donation description in a single sentence:

{{{description}}}`,
});

const summarizeDonationDetailsFlow = ai.defineFlow(
  {
    name: 'summarizeDonationDetailsFlow',
    inputSchema: SummarizeDonationDetailsInputSchema,
    outputSchema: SummarizeDonationDetailsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
