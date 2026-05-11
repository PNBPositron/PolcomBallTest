# 🎭 Polcomballs Political Test

An interactive web-based political ideology test based on all the polcomballs! Discover which political ideologies align with your values through a comprehensive 20-question quiz.

## 🚀 Features

- **20 Carefully Crafted Questions**: Covering major political axes including authority, economics, progress, society, and environment
- **26+ Political Ideologies**: From anarchism to transhumanism, featuring most major political movements
- **7-Point Likert Scale**: Detailed answers from "Strongly Disagree" to "Strongly Agree"
- **Smart Scoring Algorithm**: Multiplies answers by ideology-specific weights for accurate results
- **Beautiful UI**: Gradient purple theme with smooth animations and responsive design
- **Mobile Responsive**: Works perfectly on desktop, tablet, and mobile devices
- **Results Dashboard**: Shows your top 5 matching ideologies with percentages

## 🎯 Ideologies Covered

The test measures your alignment with ideologies including:

- Anarchism, Anarcho-Communism, Anarcho-Capitalism
- Communism, Socialism, Social Democracy
- Liberalism, Libertarianism, Conservatism
- Fascism, Authoritarianism, Monarchism
- Transhumanism, Technocracy
- Feminism, Environmentalism
- Nationalism, Internationalism
- Marxism, Capitalism, Democracy
- And many more!

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 + React 18
- **Language**: TypeScript
- **Styling**: CSS3 with gradients and animations
- **Deployment**: Vercel (recommended)

## 📦 Installation

### Prerequisites
- Node.js 16+ and npm/yarn installed

### Setup

```bash
# Clone the repository
git clone https://github.com/PNBPositron/PolcomBallTest.git
cd PolcomBallTest

# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000 in your browser
```

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Visit https://vercel.com/import
3. Select your repository
4. Vercel will auto-detect Next.js and deploy
5. Your app will be live at a Vercel URL

### Build for Production

```bash
npm run build
npm run start
```

## 📁 Project Structure

```
.
├── components/
│   ├── QuestionCard.tsx      # Question display component
│   └── ResultsView.tsx       # Results display component
├── data/
│   ├── ideologies.ts         # All 26+ ideologies with descriptions
│   └── questions.ts          # 20 questions with ideology weights
├── pages/
│   ├── _app.tsx              # Next.js app wrapper
│   ├── _document.tsx         # HTML document structure
│   └── index.tsx             # Main quiz page
├── styles/
│   └── globals.css           # Global styles and responsive design
├── package.json              # Dependencies and scripts
├── tsconfig.json             # TypeScript configuration
├── next.config.js            # Next.js configuration
└── README.md                 # This file
```

## 🎮 How It Works

1. **Answer Questions**: Respond to 20 political questions on a 7-point scale
2. **Score Calculation**: Each answer is multiplied by ideology-specific weights
3. **Normalize Results**: Scores are normalized to 0-100% scale
4. **Rank Ideologies**: Top 5 matching ideologies are displayed with percentages
5. **View Results**: See detailed results with descriptions for each ideology

## 🔧 Customization

### Add More Questions

Edit `data/questions.ts` and add questions to the `QUESTIONS` array:

```typescript
{
  id: 'qN',
  text: 'Your question here?',
  category: 'Category Name',
  ideologyWeights: {
    anarchism: 5,
    capitalism: -5,
    // ... more weights
  },
}
```

### Add More Ideologies

Edit `data/ideologies.ts` and add to the `IDEOLOGIES` array:

```typescript
{
  id: 'myIdeology',
  name: 'My Ideology',
  description: 'Description here...',
  color: '#HEX_COLOR',
}
```

### Customize Styling

Edit `styles/globals.css` to change colors, fonts, spacing, etc.

## 📊 Scoring

The scoring algorithm:

1. For each question, multiply the answer (-5 to +5) by each ideology's weight
2. Sum all weighted answers for each ideology
3. Normalize scores to 0-100 percentage scale
4. Sort ideologies by score (highest first)
5. Display top 5 results

## 🤝 Contributing

Contributions are welcome! Feel free to:

- Add more questions
- Add more ideologies
- Improve the UI/UX
- Fix bugs
- Improve documentation

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Credits

Inspired by the Polcomballs community and political compass testing.

## 📞 Support

For issues, questions, or suggestions, please open a GitHub issue.

---

**Happy Testing!** 🎭✨
