
import './App.css'
import { Menu } from './components/menu'
import { Sidebar } from './components/sidebar'
import { Outlet } from '@tanstack/router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();
function App() {

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <div className="md:hidden">
          <img
            src="/examples/music-light.png"
            width={1280}
            height={1114}
            alt="Music"
            className="block dark:hidden"
          />
          <img
            src="/examples/music-dark.png"
            width={1280}
            height={1114}
            alt="Music"
            className="hidden dark:block"
          />
        </div>
        <div className="hidden md:block">
          <Menu />
          <div className="border-t">
            <div className="bg-background">
              <div className="grid lg:grid-cols-5">
                <Sidebar className="hidden lg:block" />
                <div className="col-span-3 lg:col-span-4 lg:border-l">
                  <div className="h-full px-4 py-6 lg:px-8">
                    <Outlet />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </QueryClientProvider>
    </>
  )
}

export default App
