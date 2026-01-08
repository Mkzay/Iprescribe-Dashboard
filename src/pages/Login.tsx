import { useState } from "react";
import {
  Stack,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import EyeHideIcon from "../assets/icons/eye-hide.svg?react";
import { apiLogin } from "../lib/api";

interface LoginProps {
  onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { email?: string; password?: string } = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    try {
      const res = await apiLogin(email, password);
      const token = res?.data?.token;
      if (!token) throw new Error("Login failed: missing token");
      localStorage.setItem("token", token);
      onLogin();
    } catch (err: any) {
      setErrors({ email: undefined, password: err?.message || "Login failed" });
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{
        background: "linear-gradient(180deg, #283C85 0%, #0A0E1A 100%)",
      }}
    >
      <div className="w-full max-w-md animate-fadeInUp">
        <Stack
          component="form"
          onSubmit={handleSubmit}
          spacing={4.25}
          sx={{
            backgroundColor: "background.paper",
            borderRadius: "20px",
            padding: "40px 32px",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.08)",
          }}
        >
          <div className="flex justify-center">
            <img
              src="/logo.png"
              alt="iPrescribe"
              className="w-[116px] h-[100px] object-cover"
            />
          </div>

          <Stack spacing={1.25}>
            <Typography
              variant="h3"
              sx={{
                fontSize: "20px",
                fontWeight: 700,
                lineHeight: "24px",
                color: "text.primary",
                textAlign: "center",
              }}
            >
              Login to iPrescribe Admin
            </Typography>
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 400,
                color: "text.secondary",
                textAlign: "center",
              }}
            >
              Provide the required details to login
            </Typography>
          </Stack>

          <Stack spacing={1.875}>
            <Stack spacing={0.75}>
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 400,
                  color: "#616161",
                }}
              >
                Email Address
              </Typography>
              <TextField
                fullWidth
                placeholder="e.g admin@careoneclinics.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors({ ...errors, email: undefined });
                }}
                error={!!errors.email}
                helperText={errors.email}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "#9E9E9E",
                  },
                }}
              />
            </Stack>

            <Stack spacing={0.75}>
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 400,
                  color: "#616161",
                }}
              >
                Password
              </Typography>
              <TextField
                fullWidth
                type={showPassword ? "text" : "password"}
                placeholder="**********************"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password)
                    setErrors({ ...errors, password: undefined });
                }}
                error={!!errors.password}
                helperText={errors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        size="small"
                      >
                        <EyeHideIcon
                          width={12}
                          height={11}
                          style={{ color: "#9E9E9E" }}
                        />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "8px",
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "#9E9E9E",
                  },
                }}
              />
            </Stack>

            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 500,
                color: "text.secondary",
                textAlign: "right",
                cursor: "pointer",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              Forgot password?
            </Typography>
          </Stack>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: "primary.main",
              color: "white",
              fontSize: "14px",
              fontWeight: 600,
              letterSpacing: "0.17px",
              textTransform: "none",
              borderRadius: "8px",
              padding: "12px",
              "&:hover": {
                backgroundColor: "primary.dark",
              },
            }}
          >
            Login
          </Button>
        </Stack>
      </div>
    </div>
  );
}
