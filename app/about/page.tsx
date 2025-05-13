import { PageTransition } from "@/components/page-transition"

export default function AboutPage() {
  return (
    <PageTransition>
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">About Recipe Finder</h1>

          <div className="prose prose-lg max-w-none">
            <p>
              Recipe Finder is a modern web application designed to help you discover delicious recipes based on
              ingredients you already have at home. Our mission is to reduce food waste and inspire culinary creativity
              by making it easy to find recipes that match what's in your pantry.
            </p>

            <h2>Our Story</h2>
            <p>
              Recipe Finder was born out of a common frustration: staring at a refrigerator full of ingredients and not
              knowing what to cook. We wanted to create a tool that would help people make the most of what they have,
              discover new recipes, and reduce food waste in the process.
            </p>

            <h2>How It Works</h2>
            <p>
              Our application uses the powerful Spoonacular API to search through thousands of recipes and find matches
              based on the ingredients you input. Simply enter what you have on hand, and we'll show you recipes you can
              make right now.
            </p>

            <h2>Our Team</h2>
            <p>
              Recipe Finder is maintained by a small team of food enthusiasts and developers who are passionate about
              cooking and technology. We're constantly working to improve the app and add new features to enhance your
              cooking experience.
            </p>

            <h2>Contact Us</h2>
            <p>
              Have questions, suggestions, or feedback? We'd love to hear from you! Visit our
              <a href="/contact" className="text-primary hover:underline">
                {" "}
                Contact page
              </a>{" "}
              to get in touch.
            </p>
          </div>
        </div>
      </main>
    </PageTransition>
  )
}
