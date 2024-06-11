import {
  Button,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { VolumeOff, VolumeUp } from "@mui/icons-material";

function App() {
  const [advice, setAdvice] = useState("");
  const [mute, setMute] = useState(false);
  const [giveMe, setGiveMe] = useState(false);
  const [password, setPassword] = useState("");

  const getAdvice = () => {
    axios
      .get("https://api.adviceslip.com/advice")
      .then((response) => {
        setAdvice(response.data.slip.advice);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    getAdvice();
  }, []);

  return (
    <>
      {giveMe && <IconButton
        onClick={() => setMute(!mute)}
        color="primary"
        sx={{ position: "absolute", top: 20, left: 20 }}
      >
        {mute ? <VolumeOff /> : <VolumeUp />}
      </IconButton>}
      <audio
        src={require("./piano1.mp3")}
        className="m"
        style={{ position: "absolute", top: 50, left: 50 }}
        autoPlay
        muted={mute}
        loop
      />
      <Stack
        sx={{
          position: "absolute",
          bottom: 10,
          right: 10,
          fontFamily: "Dancing Script",
          fontSize: 20,
          fontWeight: 700,
        }}
      >
        🤍 Mahmoud & Jawa 🤍
      </Stack>
      <Stack
        sx={{
          width: { xs: 300, sm: 500, md: 700 },
          px: 2,
          py: 3,
          mb: 35,
          borderRadius: 5,
          bgcolor: "#ffffff80",
          alignItems: "center",
          justifyContent: "center",
        }}
        gap={3}
      >
        {giveMe && (
          <>
            <Typography
              variant="h6"
              sx={{
                fontFamily: "Noto Serif",
                textAlign: "center",
                fontWeight: "bold",
                fontSize: { xs: 20, sm: 23, md: 25, lg: 30 },
              }}
            >
              {advice} 🤍
            </Typography>
            <Button
              onClick={getAdvice}
              sx={{
                bgcolor: "#034ae5",
                color: "#FFF",
                ":hover": { bgcolor: "#1c60ef" },
              }}
            >
              My Advice For You
            </Button>
          </>
        )}
        {!giveMe && (
          <Stack gap={2}>
            <Typography
              component={"input"}
              sx={{
                p: "10px 5px",
                borderRadius: 4,
                outline: "none",
                bgcolor: "#00000008 !important",
                border: "none",
                boxShadow: "0 0 15px rgba(0,45,249,.5)",
              }}
              autoComplete="true"
              variant="filled"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              sx={{
                bgcolor: "#002df9",
                ":hover": { bgcolor: "#002df9" },
                color: "#FFF",
              }}
              onClick={() => {
                if (password === "mahmud & jawa") {
                  setGiveMe(true);
                  document.querySelector(".m").play();
                }
              }}
            >
              Stay Together For Ever🤍
            </Button>
          </Stack>
        )}
      </Stack>
    </>
  );
}

export default App;
