'use server';

/**
 * @fileOverview This file defines a Genkit flow to generate a donation title based on the description provided by the user.
 *
 * - generateDonationTitle - A function that generates a donation title based on the description.
 * - GenerateDonationTitleInput - The input type for the generateDonationTitle function.
 * - GenerateDonationTitleOutput - The return type for the generateDonationTitle function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateDonationTitleInputSchema = z.object({
  description: z
    .string()
    .describe('The description of the donation item or food.'),
});
export type GenerateDonationTitleInput = z.infer<typeof GenerateDonationTitleInputSchema>;

const GenerateDonationTitleOutputSchema = z.object({
  title: z
    .string()
    .describe('The generated title for the donation post.'),
});
export type GenerateDonationTitleOutput = z.infer<typeof GenerateDonationTitleOutputSchema>;

export async function generateDonationTitle(input: GenerateDonationTitleInput): Promise<GenerateDonationTitleOutput> {
  return generateDonationTitleFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateDonationTitlePrompt',
  input: {schema: GenerateDonationTitleInputSchema},
  output: {schema: GenerateDonationTitleOutputSchema},
  prompt: `You are a helpful assistant designed to generate catchy and concise titles for donation posts.

  Given the following description, please generate a suitable title.

  Description: {{{description}}}

  Please generate ONLY the title. Do not add any other explanation or text. Return ONLY the title.`,
});

const generateDonationTitleFlow = ai.defineFlow(
  {
    name: 'generateDonationTitleFlow',
    inputSchema: GenerateDonationTitleInputSchema,
    outputSchema: GenerateDonationTitleOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
