console.log("[ttvad]", "script.js loaded");

//video_sel = 'video[playsinline webkit-playsinline]';
video_sel = 'video';
carousel_sel = 'div[data-a-target="front-page-carousel"]';

async function sleep (ms) {
	await new Promise(r => setTimeout(r, ms));
}

async function get_player () {
	video_list = document.querySelectorAll(video_sel);

	poll_rate = 250; //ms
	timeout_left = 60 * 1000; // ms

	init_timeout = 60 * 1000; // ms 
	while(timeout_left > 0) {
		if (video_list.length != 0) {
			console.log("[ttvad]", "time elapsed: " + (init_timeout - timeout_left));
			return video_list;

		} else {
			await sleep(poll_rate);
			video_list = document.querySelectorAll(video_sel);

		}

		timeout_left -= poll_rate;
	}
}

function block_player (player_list) {
	block_player.play_count = 0;

	player_list[0].onplay = function () {
		player = document.querySelectorAll(video_sel)[0];
		player.pause();

		if (block_player.play_count > 1) {
			player.onplay = null;
		}
		block_player.play_count += 1;
	}

}

// unused
function unblock_player (player_list) {
	player_list[0].onplay = null;
}

// unused
function remove_carousel () {
	// works but if the carousel thing is removed,
	// then it seem onplay() is not called
	carousel_list = document.querySelectorAll(carousel_sel);
	carousel_list[0].remove();
}


player = get_player();
player.then(value => block_player(value));

//remove_carousel();
