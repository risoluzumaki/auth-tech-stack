package logger

import (
	"os"

	log "github.com/sirupsen/logrus"
)

var Log *log.Logger

func Init() {
	Log = log.New()

	Log.SetFormatter(&log.JSONFormatter{})
	Log.SetOutput(os.Stdout)

	level := os.Getenv("LOG_LEVEL")
	switch level {
	case "DEBUG":
		Log.SetLevel(log.DebugLevel)
	case "WARN":
		Log.SetLevel(log.WarnLevel)
	case "ERROR":
		Log.SetLevel(log.ErrorLevel)
	default:
		Log.SetLevel(log.InfoLevel)
	}
}
