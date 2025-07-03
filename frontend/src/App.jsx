import { RouterProvider } from "react-router";
import router from "./router.jsx";
import { Toaster } from "react-hot-toast";
import { CaptainDataProvider } from "./context/CaptainContext.jsx";
import { UserDataProvider } from "./context/UserContext.jsx";

function App() {
  return (
    <>
      <CaptainDataProvider>
        <UserDataProvider>
          <Toaster
            position="bottom-right"
            reverseOrder={false}
            gutter={8}
            containerClassName=""
            containerStyle={{}}
            toastOptions={{
              // Define default options
              className: "",
              duration: 3000,
              removeDelay: 100,
              style: {
                background: "rgb(23 23 23)",
                color: "#fff",
              },

              // Default options for specific types
              success: {
                duration: 3000,
                iconTheme: {
                  primary: "green",
                  secondary: "black",
                },
              },
            }}
          />
          <RouterProvider router={router} />
        </UserDataProvider>
      </CaptainDataProvider>
    </>
  );
}

export default App;
