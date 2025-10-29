import { Head, useForm, usePage } from '@inertiajs/react'
import { toast } from 'sonner'
import { useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"

export default function Login() {
  const { flash } = usePage().props  // Get flash from shared data
  const { data, setData, post, processing, errors } = useForm({
    user: {
      email: '',
      password: '',
      remember_me: false,
    }
  })

  useEffect(() => {
    if (flash?.error) {
      toast.error(flash.error)
    }
  }, [flash])

  const handleSubmit = (e) => {
    e.preventDefault()
    post('/users/sign_in')
  }

  return (
    <>
      <Head title="Login" />
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold text-gray-800">
              Welcome Back
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={data.user.email}
                  onChange={(e) => setData('user', { ...data.user, email: e.target.value })}
                />
                {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={data.user.password}
                  onChange={(e) => setData('user', { ...data.user, password: e.target.value })}
                />
                {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
              </div>

              <Button disabled={processing} className="w-full">
                Login
              </Button>
            </form>
          </CardContent>
          <CardFooter className="text-center text-sm">
            <a href="/users/sign_up" className="text-blue-600 hover:underline">
              Don’t have an account? Sign up
            </a>
          </CardFooter>
        </Card>
      </div>
    </>
  )
}
