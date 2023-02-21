import threading
import discord
class DiscordBot(threading.Thread):
    def __init__(self,message):
        self.message = message
        threading.Thread.__init__(self)
    def run(self):
        client = discord.Client(intents=discord.Intents.default())
        client.run('MTA3NzQ4MzcwNDg4MjA1NzIzNg.GXDPhh.YrYSDV8NJWAbjpFjcTqxxtM5PLv2GxXhqVPTLo')
        channel = client.get_channel(1077512613132521563)
        channel.send("testing")