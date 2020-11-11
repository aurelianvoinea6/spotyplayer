import React from "react";

//create your first component
export class Home extends React.Component {
	constructor() {
		super();
		this.state = {
			currentIndex: 0,
			songs: []
		};
		this.player = React.createRef();
	}

	componentDidMount() {
		fetch("https://assets.breatheco.de/apis/sound/songs")
			.then(songs => songs.json())
			.then(data => this.setState({ songs: data }))
			.catch(error => console.log("Error"));
	}

	playFunction = () => {
		var endpoint = this.state.songs[this.state.currentIndex].url;
		var fullurl = "https://assets.breatheco.de/apis/sound/" + endpoint;
		this.player.current.src = fullurl;
		this.player.current.pause();
		this.player.current.load();
		this.player.current.play();
	};
	nextsong = async () => {
		if (this.state.currentIndex < this.state.songs.length) {
			await this.setState({ currentIndex: this.state.currentIndex + 1 });
			this.playFunction();
		} else {
			await this.setState({ currentIndex: 0 });
			this.playFunction();
		}
	};
	previoussong = async () => {
		if (this.state.currentIndex > 0) {
			await this.setState({ currentIndex: this.state.currentIndex - 1 });
			this.playFunction();
		} else {
			this.playFunction();
		}
	};
	pause = () => {
		this.player.current.pause();
	};

	render() {
		// console.log(this.state.songs);
		return (
			<div className="text-center mt-5">
				<ul>
					{this.state.songs.map((eachsong, index) => {
						return (
							<li
								className="songlist"
								onClick={() =>
									this.setState({ currentIndex: index })
								}
								key={index}>
								{eachsong.name}
							</li>
						);
					})}
				</ul>
				<audio ref={this.player} />
				<ul>
					<li className="clickers">
						<i
							className="fa fa-step-backward"
							aria-hidden="true"
							onClick={this.previoussong}
						/>
					</li>
					<li className="clickers">
						<i
							className="fa fa-play"
							aria-hidden="true"
							onClick={this.playFunction}
						/>
					</li>
					<li className="clickers">
						<i
							className="fa fa-pause"
							aria-hidden="true"
							onClick={this.pause}
						/>
					</li>
					<li className="clickers">
						<i
							className="fa fa-step-forward"
							aria-hidden="true"
							onClick={this.nextsong}
						/>
					</li>
				</ul>
			</div>
		);
	}
}
