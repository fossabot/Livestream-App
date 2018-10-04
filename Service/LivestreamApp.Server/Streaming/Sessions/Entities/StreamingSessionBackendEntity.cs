﻿using LivestreamApp.Server.Streaming.Streams;
using System;

namespace LivestreamApp.Server.Streaming.Sessions.Entities
{
    public class StreamingSessionBackendEntity
    {
        public string Id;
        public string Title;
        public DateTime? TimeStarted;
        public DateTime? TimeEnded;
        public DateTime? TimeStarting;
        public DateTime? TimeEnding;
        public DateTime? TimeServerShutdown;
        public Livestreams Livestreams;
    }
}
