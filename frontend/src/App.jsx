import { RouterProvider } from "react-router";
import router from "./router.jsx";
import { ThemeProvider } from "./context/themeContext.jsx";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <ThemeProvider>
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
            background: "#363636",
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
    </ThemeProvider>
  );
}

export default App;
