const { EmbedBuilder, WebhookClient } = require('discord.js');
const axios = require('axios')
const webhookClient = new WebhookClient({url: 'https://discord.com/api/webhooks/1147887454351786024/zBmTQ6KfmHNqktt_NTuXa2O2WA2EhNGD9S2BvVyK1GrdXLU0U8uVPQcdfMVgCnFh4cxt'});
const fs = require('fs')
const path = require("path")
var sys = require('util')
var exec = require('child_process').exec;
var messageid
async function webhook() {
try {

const embed = new EmbedBuilder()
	.setTitle('Players no Sem Chorar:')
	.setColor('#00FF00');

axios.get('https://publicapi.battlebit.cloud/Servers/GetServerList')
  .then(async ({ data }) => {
	var len = data.length
	var i = 0
	var total_players = 0
	while (i < len) {
		if (data[i].Name.includes("Sem Chorar")) {
			total_players = total_players + data[i].Players
			embed.addFields({ name: data[i].Name, value: `Players: ${data[i].Players}/${data[i].MaxPlayers} (+${data[i].QueuePlayers})\nMapa: ${data[i].Map}\nTempo: ${data[i].DayNight}\nModo: ${data[i].Gamemode}`, inline: false })
		}
		i++
	}
	let date_ob = new Date();
	let date = ("0" + date_ob.getDate()).slice(-2);
	let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
	let year = date_ob.getFullYear();
	let hours = date_ob.getHours();
	let minutes = date_ob.getMinutes();
	if (hours <= 9) {
		hours = `0${hours}`
	}
	if (minutes <= 9) {
		minutes = `0${minutes}`
	}
	embed.setTitle(`Players no Sem Chorar: ${total_players}`)
	try {
		var savedid = await fs.readFileSync('id.txt', 'utf8', (err, data) => {
			if (err) {
			  console.error(err);
			  return;
			}
			return data;
		  });
		await webhookClient.fetchMessage(savedid)
		webhookClient.editMessage(savedid,
			{
				content: `Editado última vez em: ${date}/${month}/${year} **${hours}:${minutes}**\n\n`,
				embeds: [embed]
			})
	} catch(Exception) {
		if (Exception.status == 404) {
			messageid = await webhookClient.send({
				content: `Editado última vez em: ${date}/${month}/${year} **${hours}:${minutes}**\n\n`,
				embeds: [embed]
			})
			await fs.writeFileSync("id.txt",messageid.id)
		}
	}
});
} catch (Exception) {
	console.log(Exception)
}
}
setInterval(webhook,3500)
