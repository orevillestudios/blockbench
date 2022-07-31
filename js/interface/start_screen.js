const StartScreen = {};

function addStartScreenSection(id, data) {
	if (typeof id == 'object') {
		data = id;
		id = '';
	}
	var obj = $(Interface.createElement('section', {id}))
	if (typeof data.graphic === 'object') {
		var left = $('<div class="start_screen_left graphic"></div>')
		obj.append(left)

		if (data.graphic.type === 'icon') {
			var icon = Blockbench.getIconNode(data.graphic.icon)
			left.addClass('graphic_icon')
			left.append(icon)
		} else {
			left.css('background-image', `url('${data.graphic.source}')`)
		}
		if (data.graphic.width) {
			left.css('width', data.graphic.width+'px');
		}
		if (data.graphic.width && data.text) {
			left.css('flex-shrink', '0');
		}
		if (data.graphic.width && data.graphic.height && Blockbench.isMobile) {
			left.css('height', '0')
				.css('padding-top', '0')
				.css('padding-bottom', (data.graphic.height/data.graphic.width*100)+'%')
		} else {
			if (data.graphic.height) left.css('height', data.graphic.height+'px');
			if (data.graphic.width && !data.graphic.height && !data.graphic.aspect_ratio) left.css('height', data.graphic.width+'px');
			if (data.graphic.aspect_ratio) left.css('aspect-ratio', data.graphic.aspect_ratio);
		}
		if (data.graphic.description) {
			let content = $(marked(data.graphic.description));
			content.css({
				'bottom': '15px',
				'right': '15px',
				'color': data.graphic.text_color || '#ffffff',
			});
			left.append(content);
		}
	}
	if (data.text instanceof Array) {
		var right = $('<div class="start_screen_right"></div>')
		obj.append(right)
		data.text.forEach(line => {
			var content = line.text ? marked(tl(line.text)) : '';
			switch (line.type) {
				case 'h1': var tag = 'h2'; break;
				case 'h2': var tag = 'h3'; break;
				case 'list':
					var tag = 'ul class="list_style"';
					line.list.forEach(string => {
						content += `<li>${marked(tl(string))}</li>`;
					})
					break;
				case 'button': var tag = 'button'; break;
				default:   var tag = 'p'; break;
			}
			var l = $(`<${tag}>${content}</${tag.split(' ')[0]}>`);
			if (typeof line.click == 'function') {
				l.on('click', line.click);
			}
			right.append(l);
		})
	}
	if (data.layout == 'vertical') {
		obj.addClass('vertical');
	}

	if (data.features instanceof Array) {
		let features_section = document.createElement('ul');
		features_section.className = 'start_screen_features'
		data.features.forEach(feature => {
			let li = document.createElement('li');
			let img = new Image(); img.src = feature.image;
			let title = document.createElement('h3'); title.textContent = feature.title;
			let text = document.createElement('p'); text.textContent = feature.text;
			li.append(img, title, text);
			features_section.append(li);
		})
		obj.append(features_section);
	}

	if (data.closable !== false) {
		obj.append(`<i class="material-icons start_screen_close_button">clear</i>`);
		obj.find('i.start_screen_close_button').click((e) => {
			obj.detach()
		});
	}
	if (typeof data.click == 'function') {
		obj.on('click', event => {
			if (event.target.classList.contains('start_screen_close_button')) return;
			data.click()
		})
	}
	if (data.color) {
		obj.css('background-color', data.color);
		if (data.color == 'var(--color-bright_ui)') {
			obj.addClass('bright_ui')
		}
	}
	if (data.text_color) {
		obj.css('color', data.text_color);
	}
	if (data.last) {
		$('#start_screen content').append(obj);
	} else if (data.insert_after) {
		$('#start_screen content').find(`#${data.insert_after}`).after(obj);
	} else if (data.insert_before) {
		$('#start_screen content').find(`#${data.insert_before}`).before(obj);
	} else {
		$('#start_screen content').prepend(obj);
	}
	if (!obj[0].parentElement) {
		$('#start_screen content').append(obj);
	}
	return {
		delete() {
			obj[0].remove();
		}
	}
}

onVueSetup(function() {
	StateMemory.init('start_screen_list_type', 'string')

	StartScreen.vue = new Vue({
		el: '#start_screen',
		data: {
			formats: Formats,
			recent: isApp ? recent_projects : [],
			list_type: StateMemory.start_screen_list_type || 'grid',
			redact_names: settings.streamer_mode.value,
			redacted: tl('generic.redacted'),
			search_term: '',
			isApp,
			getIconNode: Blockbench.getIconNode
		},
		methods: {
			getDate(p) {
				if (p.day) {
					var diff = (365e10 + Blockbench.openTime.dayOfYear() - p.day) % 365;
					if (diff <= 0) {
						return tl('dates.today');
					} else if (diff == 1) {
						return tl('dates.yesterday');
					} else if (diff <= 7) {
						return tl('dates.this_week');
					} else {
						return tl('dates.weeks_ago', [Math.ceil(diff/7)]);
					}
				} else {
					return '-'
				}
			},
			openProject: function(p, event) {
				Blockbench.read([p.path], {}, files => {
					loadModelFile(files[0]);
				})
			},
			getThumbnail(model_path) {
				let hash = model_path.hashCode().toString().replace(/^-/, '0');
				let path = PathModule.join(app.getPath('userData'), 'thumbnails', `${hash}.png`);
				if (!fs.existsSync(path)) return;
				return path + '?' + Math.round(Math.random()*255);
			},
			setListType(type) {
				this.list_type = type;
				StateMemory.start_screen_list_type = type;
				StateMemory.save('start_screen_list_type')
			},
			tl
		},
		computed: {
			projects() {
				if (!this.search_term) return this.recent;
				let terms = this.search_term.toLowerCase().split(/\s/);

				return this.recent.filter(project => {
					return !terms.find(term => (
						!project.path.toLowerCase().includes(term)
					))
				})
			}
		},
		template: `
			<div id="start_screen">
				<content>
					<section id="start-files">
						<div class="start_screen_left">
							<h2>${tl('mode.start.new')}</h2>
							<div class="bar next_to_title">
								<div class="tool" onclick="Blockbench.openLink('https://blockbench.net/quickstart/')">
									<div class="tooltip">${tl('menu.help.quickstart')}</div>
									<i class="fas fa-question-circle"></i>
								</div>
							</div>
							<ul>
								<li v-for="format in formats" v-if="format.show_on_start_screen && (!redact_names || !format.confidential)" v-on:click="format.new()">
									<span class="icon_wrapper f_left" v-html="getIconNode(format.icon).outerHTML"></span>
									<h3>{{ format.name }}</h3>
									<p>{{ format.description }}</p>
								</li>
							</ul>
						</div>
						<div class="start_screen_right">
							<h2 class="tl">${tl('mode.start.recent')}</h2>
							<div id="start_screen_view_menu" v-if="isApp && !redact_names">
								<search-bar :hide="true" v-model="search_term"></search-bar>
								<li class="tool" v-bind:class="{selected: list_type == 'grid'}" v-on:click="setListType('grid')">
									<i class="material-icons">view_module</i>
								</li>
								<li class="tool" v-bind:class="{selected: list_type == 'list'}" v-on:click="setListType('list')">
									<i class="material-icons">list</i>
								</li>
							</div>
							<div v-if="redact_names">{{ '['+tl('generic.redacted')+']' }}</div>
							<ul v-else-if="list_type == 'list'">
								<li v-on:click="openProject(project, $event)" v-for="project in projects" :key="project.path" v-bind:title="redact_names ? '' : project.path" class="recent_project">
									<span class="icon_wrapper" v-html="getIconNode(project.icon).outerHTML"></span>
									<span class="recent_project_name">{{ redact_names ? redacted : project.name }}</span>
									<span class="recent_project_date">{{ getDate(project) }}</span>
								</li>
								<div v-if="recent.length == 0">{{ tl('mode.start.no_recents') }}</div>
							</ul>
							<ul :class="{redact: redact_names}" style="display: grid;" v-else>
								<li v-on:click="openProject(project, $event)" v-for="project in projects" :key="project.path" v-bind:title="redact_names ? '' : project.path" class="recent_project thumbnail">
									<img class="thumbnail_image" v-if="getThumbnail(project.path)" :src="getThumbnail(project.path)" />
									<span class="recent_project_name">{{ redact_names ? redacted : project.name }}</span>
									<span class="icon_wrapper" v-html="getIconNode(project.icon).outerHTML"></span>
								</li>
							</ul>
							<button style="margin-top: 20px;" onclick="BarItems.open_model.trigger()">${tl('action.open_model')}</button>
						</div>
					</section>
				</content>
			</div>
		`
	})
});


(function() {
	/*$.getJSON('./content/news.json').then(data => {
		addStartScreenSection('new_version', data.new_version)
	})*/

	var news_call = $.ajax({
		cache: false,
		url: 'https://web.blockbench.net/content/news.json',
		dataType: 'json'
	});
	documentReady.then(() => {
		Blockbench.startup_count = parseInt(localStorage.getItem('startups')||0)

		//Backup Model
		if (localStorage.getItem('backup_model') && (!isApp || !currentwindow.webContents.second_instance)) {
			var backup_model = localStorage.getItem('backup_model')
			localStorage.removeItem('backup_model')

			addStartScreenSection({
				color: 'var(--color-back)',
				graphic: {type: 'icon', icon: 'fa-archive'},
				text: [
					{type: 'h2', text: tl('message.recover_backup.title')},
					{text: tl('message.recover_backup.message')},
					{type: 'button', text: tl('dialog.ok'), click: (e) => {
						loadModelFile({content: backup_model, path: 'backup.bbmodel', no_file: true})
					}}
				]
			})
		}
		if (settings.streamer_mode.value) {
			updateStreamerModeNotification()
		}
		addStartScreenSection('splash_screen', {
			"text_color": '#000000',
			"graphic": {
				"type": "image",
				"source": "./assets/splash_art.png?42",
				"width": 1000,
				"aspect_ratio": "21/9",
				"description": "Splash Art by [Shroomy](https://twitter.com/ShroomyArts) and [RedstoneMvv](https://twitter.com/Redstone_mvv)",
				"text_color": '#cfcfcf'
			}
		})
		if (!Blockbench.hasFlag('after_update')) {
			document.getElementById('start_screen').scrollTop = 100;
		}

		//Twitter
		let twitter_ad;
		if (Blockbench.startup_count < 20 && Blockbench.startup_count % 5 === 4) {
			twitter_ad = true;
			addStartScreenSection({
				color: '#1da1f2',
				text_color: '#ffffff',
				graphic: {type: 'icon', icon: 'fab.fa-twitter'},
				text: [
					{type: 'h2', text: 'Blockbench on Twitter'},
					{text: 'Follow Blockbench on Twitter for the latest news as well as cool models from the community! [twitter.com/blockbench](https://twitter.com/blockbench/)'}
				],
				last: true
			})
		}
		//Discord
		if (Blockbench.startup_count < 6 && !twitter_ad) {
			addStartScreenSection({
				color: '#5865F2',
				text_color: '#ffffff',
				graphic: {type: 'icon', icon: 'fab.fa-discord'},
				text: [
					{type: 'h2', text: 'Discord Server'},
					{text: 'You need help with modeling or you want to chat about Blockbench? Join the official [Blockbench Discord](https://discord.gg/WVHg5kH)!'}
				],
				last: true
			})
		}

		// Quick Setup
		if (Blockbench.startup_count <= 1) {
			
			let section = Interface.createElement('section', {id: 'quick_setup'});
			$('#start_screen content').prepend(section);

			new Vue({
				data() {return {
					language: Language.code,
					language_original: Language.code,
					languages: Language.options,
					keymap: 'default',
					keymap_changed: false,
					theme: 'dark',
				}},
				methods: {
					tl,
					close() {
						obj.remove();
					},
					reload() {
						Blockbench.reload();
					},
					loadTheme(theme_id) {
						this.theme = theme_id;
						let theme = CustomTheme.themes.find(t => t.id == theme_id);
						if (theme) CustomTheme.loadTheme(theme);
					},
					getThemeThumbnailStyle(theme_id) {
						let theme = CustomTheme.themes.find(t => t.id == theme_id);
						let style = {};
						if (!theme) return style;
						for (let key in theme.colors) {
							style[`--color-${key}`] = theme.colors[key];
						}
						return style;
					},
					openThemes() {
						BarItems.theme_window.click();
					}
				},
				watch: {
					language(v) {
						settings.language.set(v);
						Settings.save();
					},
					keymap(keymap, old_keymap) {
						this.keymap_changed = true;
						let success = Keybinds.loadKeymap(keymap, true);
						if (!success) this.keymap = old_keymap;
					}
				},
				template: `
					<section id="quick_setup">
						<i class="material-icons start_screen_close_button" @click="close()">clear</i>
						<h2>${tl('mode.start.quick_setup')}</h2>

						<div>
							<label>${tl('mode.start.keymap')}:</label>
							<select v-model="keymap">
								<option value="default">${tl('action.load_keymap.default')}</option>
								<option value="mouse">${tl('action.load_keymap.mouse')}</option>
								<option value="blender">Blender</option>
								<option value="cinema4d">Cinema 4D</option>
								<option value="maya">Maya</option>
							</select>
							<p v-if="keymap_changed">{{ tl('action.load_keymap.' + keymap + '.desc') }}</p>
						</div>
						<div>
							<label>${tl('settings.language')}:</label>
							<select v-model="language">
								<option v-for="(text, id) in languages" v-bind:value="id">{{ text }}</option>
							</select>
							<div class="tool" @click="reload()" v-if="language != language_original" :title="tl('action.reload')">
								<i class="material-icons">refresh</i>
							</div>
							<p v-if="language != language_original">{{ tl('message.restart_to_update') }}</p>
						</div>
						<div style="width: 640px;">
							<label>${tl('dialog.settings.theme')}:</label>
							<div class="quick_setup_theme" :class="{selected: theme == 'dark'}" @click="loadTheme('dark')"><div :style="getThemeThumbnailStyle('dark')"></div>Dark</div>
							<div class="quick_setup_theme" :class="{selected: theme == 'light'}" @click="loadTheme('light')"><div :style="getThemeThumbnailStyle('light')"></div>Light</div>
							<div class="quick_setup_theme" :class="{selected: theme == 'contrast'}" @click="loadTheme('contrast')"><div :style="getThemeThumbnailStyle('contrast')"></div>Contrast</div>
							<div class="quick_setup_theme more_themes" @click="openThemes()"><div><i class="material-icons">more_horiz</i></div>{{ tl('mode.start.quick_setup.more_themes') }}</div>
						</div>
					</section>
				`
			}).$mount(section);
		}
	})
	Promise.all([news_call, documentReady]).then((data) => {
		if (!data || !data[0]) return;
		data = data[0];

		//Update Screen
		if (Blockbench.hasFlag('after_update') && data.new_version) {
			data.new_version.insert_after = 'splash_screen'
			addStartScreenSection('new_version', data.new_version);
			jQuery.ajax({
				url: 'https://blckbn.ch/api/event/successful_update',
				type: 'POST',
				data: {
					version: Blockbench.version
				}
			})
		}
		if (data.psa) {
			(function() {
				if (typeof data.psa.version == 'string') {
					if (data.psa.version.includes('-')) {
						limits = data.psa.version.split('-');
						if (limits[0] && compareVersions(limits[0], Blockbench.version)) return;
						if (limits[1] && compareVersions(Blockbench.version, limits[1])) return;
					} else {
						if (data.psa.version != Blockbench.version) return;
					}
				}
				addStartScreenSection(data.psa)
			})()
		}

	})
})()
