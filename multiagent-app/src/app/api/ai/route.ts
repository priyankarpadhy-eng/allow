import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import CodeInterpreter from '@e2b/code-interpreter'

const openai = process.env.OPENAI_API_KEY ? new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
}) : null

export async function POST(req: NextRequest) {
    try {
        const { prompt, currentCode, language } = await req.json()

        // 1. Mock Response if no API Key
        if (!process.env.OPENAI_API_KEY) {
            console.log('Skipping AI API call (No Key). Returning mock response.')
            const mockCode = currentCode + `\n\n// AI Suggestion based on: "${prompt}"\nfunction main() {\n  console.log("This is a mock response because no API keys were provided.");\n}\nmain();`
            return NextResponse.json({
                newCode: mockCode,
                executionOutput: "Mock Output: Hello from the non-API version!",
                isMock: true
            })
        }

        // 2. Real AI call if key exists
        if (openai) {
            const response = await openai.chat.completions.create({
                model: 'gpt-4o',
                messages: [
                    {
                        role: 'system',
                        content: `You are an expert ${language} developer. Return ONLY the modified code without any markdown formatting or explanations.`,
                    },
                    {
                        role: 'user',
                        content: `Current Code:\n${currentCode}\n\nTask: ${prompt}`,
                    },
                ],
            })

            const newCode = response.choices[0].message.content || currentCode

            let executionOutput = ''
            if (process.env.E2B_API_KEY && (language === 'python' || language === 'javascript')) {
                try {
                    const sandbox = await CodeInterpreter.create({ apiKey: process.env.E2B_API_KEY })
                    const result = await sandbox.runCode(newCode)
                    executionOutput = result.logs.stdout.join('\n') || result.logs.stderr.join('\n')
                    await sandbox.kill()
                } catch (e) {
                    console.error('E2B Error:', e)
                }
            }

            return NextResponse.json({ newCode, executionOutput, isMock: false })
        }

        return NextResponse.json({ error: 'AI initialization failed' }, { status: 500 })
    } catch (error: any) {
        console.error('AI Route Error:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
