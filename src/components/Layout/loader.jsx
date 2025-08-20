"use client";
import { motion } from "framer-motion";

export default function PulseLoader() {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <div className="loader" />
      </motion.div>
      <style jsx>{`
        .loader {
          transform: rotateZ(45deg);
          perspective: 1000px;
          border-radius: 50%;
          width: 60px;
          height: 60px;
          color: #4a90e2;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          position: relative;
        }

        .loader:before,
        .loader:after {
          content: "";
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          width: inherit;
          height: inherit;
          border-radius: 50%;
          transform: rotateX(70deg);
          animation: 1.2s spin cubic-bezier(0.6, 0.2, 0.4, 0.8) infinite;
        }

        .loader:after {
          color: #ff6b6b;
          transform: rotateY(70deg);
          animation-delay: 0.3s;
        }

        @keyframes rotate {
          0% {
            transform: translate(-50%, -50%) rotateZ(0deg);
          }
          100% {
            transform: translate(-50%, -50%) rotateZ(360deg);
          }
        }

        @keyframes rotateccw {
          0% {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          100% {
            transform: translate(-50%, -50%) rotate(-360deg);
          }
        }

        @keyframes spin {
          0%,
          100% {
            box-shadow: 0.3em 0px 0 0px currentcolor;
          }
          12% {
            box-shadow: 0.3em 0.3em 0 0 currentcolor;
          }
          25% {
            box-shadow: 0 0.3em 0 0px currentcolor;
          }
          37% {
            box-shadow: -0.3em 0.3em 0 0 currentcolor;
          }
          50% {
            box-shadow: -0.3em 0 0 0 currentcolor;
          }
          62% {
            box-shadow: -0.3em -0.3em 0 0 currentcolor;
          }
          75% {
            box-shadow: 0px -0.3em 0 0 currentcolor;
          }
          87% {
            box-shadow: 0.3em -0.3em 0 0 currentcolor;
          }
        }

        @media (prefers-reduced-motion) {
          .loader:before,
          .loader:after {
            animation-duration: 1.5s;
          }
        }
      `}</style>
    </div>
  );
}
