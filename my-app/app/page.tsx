import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-background to-muted py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Create Polls That Matter
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Gather opinions, make decisions, and engage your community with
            beautiful, easy-to-use polls. No registration required to vote.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/polls/create">
              <Button size="lg" className="w-full sm:w-auto">
                Create Your First Poll
              </Button>
            </Link>
            <Link href="/polls">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Browse Polls
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose Polly?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Built for simplicity and power, Polly makes it easy to create
              engaging polls and gather meaningful insights from your audience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">⚡</span>
                </div>
                <CardTitle>Lightning Fast</CardTitle>
                <CardDescription>
                  Create polls in seconds. No complex setup, no learning curve.
                  Just type your question and options.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">🎨</span>
                </div>
                <CardTitle>Beautiful Design</CardTitle>
                <CardDescription>
                  Clean, modern interface that works perfectly on any device.
                  Your polls will look great everywhere.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">📊</span>
                </div>
                <CardTitle>Real-time Results</CardTitle>
                <CardDescription>
                  Watch votes come in live with beautiful charts and statistics.
                  Share results instantly with your audience.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">🔒</span>
                </div>
                <CardTitle>Privacy Focused</CardTitle>
                <CardDescription>
                  Optional authentication, anonymous voting, and full control
                  over who can participate in your polls.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">🔗</span>
                </div>
                <CardTitle>Easy Sharing</CardTitle>
                <CardDescription>
                  Share your polls anywhere with a simple link. Works great on
                  social media, email, and messaging apps.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">⚙️</span>
                </div>
                <CardTitle>Powerful Options</CardTitle>
                <CardDescription>
                  Multiple choice, single choice, time limits, authentication
                  requirements, and more advanced features.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-muted py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of users who trust Polly for their polling needs.
            Create your first poll in under a minute.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register">
              <Button size="lg" className="w-full sm:w-auto">
                Sign Up Free
              </Button>
            </Link>
            <Link href="/polls">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Explore Polls
              </Button>
            </Link>
          </div>
          <div className="mt-8 flex justify-center gap-4">
            <Badge variant="outline">No Credit Card Required</Badge>
            <Badge variant="outline">Free Forever</Badge>
            <Badge variant="outline">No Limits</Badge>
          </div>
        </div>
      </section>
    </div>
  );
}
