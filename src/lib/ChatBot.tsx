import { useEffect } from "react";

declare global {
	interface Window {
		botpressWebChat: {
			init: (config: any) => void;
		};
	}
}

const ChatBot = () => {
	useEffect(() => {
		const script = document.createElement("script");
		script.src = "https://cdn.botpress.cloud/webchat/v1/inject.js";
		script.async = true;
		document.body.appendChild(script);

		script.onload = () => {
			window.botpressWebChat.init({
				composerPlaceholder: "Chat with us",
				botConversationDescription:
					"This chatbot was built surprisingly fast with Botpress",
				botId: "c946a23f-3a33-4f62-ada6-ce60c50c44a5",
				hostUrl: "https://cdn.botpress.cloud/webchat/v1",
				messagingUrl: "https://messaging.botpress.cloud",
				clientId: "c946a23f-3a33-4f62-ada6-ce60c50c44a5",
				webhookId: "ead21126-e847-4dca-922c-751e4e2b37c1",
				lazySocket: true,
				themeName: "prism",
				frontendVersion: "v1",
				theme: "prism",
				themeColor: "#2563eb",
			});
		};
	}, []);

	return <div id="botpress-webchat" />;
};

export default ChatBot;
