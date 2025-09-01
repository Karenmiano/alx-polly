import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">
                  P
                </span>
              </div>
              <span className="font-bold text-xl">Polly</span>
            </Link>
            <p className="text-muted-foreground max-w-md">
              Create and participate in polls to gather opinions and make
              decisions together. Simple, fast, and powerful polling for
              everyone.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link
                href="/polls"
                className="block text-muted-foreground hover:text-primary transition-colors"
              >
                Browse Polls
              </Link>
              <Link
                href="/polls/create"
                className="block text-muted-foreground hover:text-primary transition-colors"
              >
                Create Poll
              </Link>
              <Link
                href="/auth/register"
                className="block text-muted-foreground hover:text-primary transition-colors"
              >
                Sign Up
              </Link>
            </div>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <div className="space-y-2">
              <Link
                href="/help"
                className="block text-muted-foreground hover:text-primary transition-colors"
              >
                Help Center
              </Link>
              <Link
                href="/privacy"
                className="block text-muted-foreground hover:text-primary transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="block text-muted-foreground hover:text-primary transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>

        <hr className="my-8 border-muted" />

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>&copy; 2024 Polly. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Built with Next.js and Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}
