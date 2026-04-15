import { Image } from "expo-image";
import {  usePathname } from "expo-router";
import { Fragment } from "react";
import { View } from "react-native";

export default function ArtifactID(){
    const artifactID = usePathname()
    return (
        <Fragment>
            <View>
              <Image
                    contentFit="cover"
                    className="min-w-4xl min-h-3xl rounded-xl"
                    style={{
                      width: "100%",
                      height: 300,
                      borderRadius: 20,
                      backgroundColor: "#0553",
                    }}
                    source={`https://cdli.earth/dl/tn_photo/${artifactID.replace('/', '')}.jpg`}
                  />
            </View>
        </Fragment>
    )
}