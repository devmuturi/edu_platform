import { Link, usePage } from "@inertiajs/react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from "lucide-react"

export default function Navbar() {
  const { auth } = usePage().props // Inertia shared prop for auth user

  return (
    <nav className="bg-zinc-900 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">

        {/* Logo */}
        <Link href="/" className="text-xl font-semibold">
          EduPlatform
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          <Link href="/" className="hover:text-gray-300">Home</Link>
          <Link href="/courses" className="hover:text-gray-300">Courses</Link>
          <Link href="/instructors" className="hover:text-gray-300">Instructors</Link>
          <Link href="/categories" className="hover:text-gray-300">Categories</Link>
          <Link href="/pricing" className="hover:text-gray-300">Pricing</Link>
        </div>

        {/* Right Side Auth / User */}
        <div className="hidden md:flex items-center space-x-4">
          {auth?.user ? (
            // ✅ If logged in
            <DropdownMenu>
              <DropdownMenuTrigger className="focus:outline-none">
                <div className="h-9 w-9 rounded-full bg-gray-700 flex items-center justify-center">
                  {auth.user.name?.charAt(0).toUpperCase() || "U"}
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-white text-black">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/logout" method="post">Logout</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            // ✅ If NOT logged in
            <>
              <Link href="/login">
                <Button variant="outline" className="text-white border-white hover:bg-white hover:text-black">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-white text-black hover:bg-gray-200">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <Sheet>
          <SheetTrigger className="md:hidden">
            <Menu className="text-white" />
          </SheetTrigger>
          <SheetContent side="left" className="bg-zinc-900 text-white">
            <div className="flex flex-col space-y-4 mt-6">
              <Link href="/">Home</Link>
              <Link href="/courses">Courses</Link>
              <Link href="/instructors">Instructors</Link>
              <Link href="/categories">Categories</Link>
              <Link href="/pricing">Pricing</Link>
            </div>

            <div className="mt-6 border-t border-zinc-700 pt-4">
              {auth?.user ? (
                <Link href="/logout" method="post">Logout</Link>
              ) : (
                <>
                  <Link href="/login" className="block mb-2">Login</Link>
                  <Link href="/register" className="block">Sign Up</Link>
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}
