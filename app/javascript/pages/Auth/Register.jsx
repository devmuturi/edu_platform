import { Head, useForm, Link, usePage } from '@inertiajs/react'
import { useEffect } from 'react'
import { toast } from 'sonner'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"

export default function Register() {
  const { flash } = usePage().props

  const { data, setData, post, processing, errors } = useForm({
    user: {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
    }
  })

  // Show toast messages for flash and validation errors
  useEffect(() => {
    if (flash?.success) toast.success(flash.success)
    if (flash?.error) toast.error(flash.error)

    if (errors && Object.keys(errors).length > 0) {
      Object.values(errors).forEach((err) => {
        if (Array.isArray(err)) {
          err.forEach((e) => toast.error(e))
        } else {
          toast.error(err)
        }
      })
    }
  }, [flash, errors])

  const handleSubmit = (e) => {
    e.preventDefault()
    post('/users')
  }

  const getError = (field) => errors[`user.${field}`] || errors[field]

  return (
    <>
      <Head title="Create Account" />

      <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold text-gray-800">
              Create an Account
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Name */}
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={data.user.name}
                  onChange={(e) =>
                    setData("user", { ...data.user, name: e.target.value })
                  }
                  className={getError('name') ? 'border-red-500' : ''}
                />
              </div>

              {/* Email */}
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={data.user.email}
                  onChange={(e) =>
                    setData("user", { ...data.user, email: e.target.value })
                  }
                  className={getError('email') ? 'border-red-500' : ''}
                />
              </div>

              {/* Password */}
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={data.user.password}
                  onChange={(e) =>
                    setData("user", { ...data.user, password: e.target.value })
                  }
                  className={getError('password') ? 'border-red-500' : ''}
                />
              </div>

              {/* Confirm Password */}
              <div>
                <Label htmlFor="password_confirmation">Confirm Password</Label>
                <Input
                  id="password_confirmation"
                  type="password"
                  value={data.user.password_confirmation}
                  onChange={(e) =>
                    setData("user", { ...data.user, password_confirmation: e.target.value })
                  }
                  className={getError('password_confirmation') ? 'border-red-500' : ''}
                />
              </div>

              <Button type="submit" disabled={processing} className="w-full mt-2">
                {processing ? 'Creating...' : 'Create Account'}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="text-center text-sm">
            <Link href="/users/sign_in" className="text-blue-600 hover:underline">
              Already have an account? Login
            </Link>
          </CardFooter>
        </Card>
      </div>
    </>
  )
}
