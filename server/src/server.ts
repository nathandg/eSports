import express from "express";
import { PrismaClient } from "@prisma/client";
import { convertHourStringToMinutes } from "./utils/covert-hour-string-to-minutes";
import cors from "cors";

import { convertMinutesToHours } from "./utils/convert-minutes-to-hours";

const app = express();
app.use(express.json());
app.use(cors());

const prisma = new PrismaClient();

app.get("/", async (req, res) => {
   res.status(200).json({ message: "Hello World" });
});

app.get("/games", async (req, res) => {
   const games = await prisma.game.findMany({
      include: {
         _count: {
            select: {
               ads: true,
            },
         },
      }
   });

   res.status(200).json(games);
})

app.get('/games/:id/ads', async (req, res) => {
   const id = req.params.id;

   const ads = await prisma.ad.findMany({
      select: {
         id: true,
         name: true,
         weekDays: true,
         useVoiceChannel: true,
         yearsPlaying: true,
         hoursStart: true,
         hoursEnd: true,
      },
      where: {
         gameId: id,
      },
      orderBy: {
         createdAt: 'desc',
      },
   });

   return res.status(200).json(ads.map(ad => {
      return {
         ...ad,
         weekDays: ad.weekDays.split(','),
         hoursStart: convertMinutesToHours(ad.hoursStart),
         hoursEnd: convertMinutesToHours(ad.hoursEnd),
      }
   }));
});

app.get('/ads/:id/discord', async (req, res) => {

   const id = req.params.id;

   const ad = await prisma.ad.findUniqueOrThrow({
      select: {
         discord: true,
      },
      where: {
         id: id,
      },
   });

   return res.status(200).json({
      discord: ad.discord,
   });
})

app.post('/games/:id/ads', async (req, res) => {

   console.log(req.body);

   const id = req.params.id;
   const body = req.body;

   const ad = await prisma.ad.create({
      data: {
         gameId: id,
         name: body.name,
         yearsPlaying: body.yearsPlaying,
         discord: body.discord,
         weekDays: body.weekDays.join(','),
         hoursStart: convertHourStringToMinutes(body.hoursStart),
         hoursEnd: convertHourStringToMinutes(body.hoursEnd),
         useVoiceChannel: body.useVoiceChannel,
      },
   });


   res.send(ad);
});

app.listen(3000, () => {
   console.log("Server started in port 3000");
});
