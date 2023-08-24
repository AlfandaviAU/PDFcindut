import { Button,HStack,Spinner, FormControl, FormLabel, Input, Table, Thead, Tbody, Tr, Th, Td, Card, CardBody, Text, CardFooter, Container, Heading, Stack, Center, TableContainer, VStack } from "@chakra-ui/react";
import { keyframes } from '@chakra-ui/react';
import axios from "axios";

import Image from "next/image";

import { useEffect, useState } from "react";

import { useDropzone } from "react-dropzone";



import catImage from "assets/wallpaper-cat-1.png"

export default function Home() {
    const [filename, setFilename] = useState("");
    const [zipname, setZipname] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [stateLoading, setStateLoading] = useState(false);


    const onDrop = (acceptedFiles) => {
        setUploadedFiles(acceptedFiles);
    };

    function handleFileChange(event) {
        setSelectedFile(event.target.files[0]);
    }

    function handleFilename(value){
        setFilename(value)
    }

    function handleZipName(value){
        setZipname(value)
    }

    async function handleMerge() {
        setStateLoading(true)
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("filename", filename || "merged");
        formData.append("zipname", zipname || "output");

        try {
            const response = await axios.post("http://127.0.0.1:5000/zip", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log(response.data);
        } catch (error) {
            console.error("Error uploading and merging files:", error);
        }
        setStateLoading(false)
    }


    return (
    <Container>
        <Center>
            <Card maxW='md' marginTop={"25%"}>
                <CardBody>
                    <Image
                        src={catImage}
                        alt="Cindut kalau jadi emeng"
                    />
                    <Stack mt='6' spacing='3'>
                        <Heading size='md' textAlign={"center"}>PDF Merge Buat Cindut</Heading>
                    </Stack>
                    <Center>
                        <Stack mt='6' spacing='3' align="center" justify={"center"}>
                            <FormControl>
                                <HStack>
                                    <FormLabel>Filenya diciniii</FormLabel>
                                    <Button
                                        as="label"
                                        htmlFor="file-input"
                                        backgroundColor="pink.50"
                                        color="black"
                                        cursor="pointer"
                                        _active={{ backgroundColor: "pink.100" }}
                                        _focus={{ boxShadow: "outline" }}
                                    >
                                        Apludd
                                        <input
                                            id="file-input"
                                            type="file"
                                            style={{ display: "none" }} // Hide the actual input visually
                                            onChange={handleFileChange}
                                        />
                                    </Button>
                                    {selectedFile && (
                                        <Text fontSize="sm" fontWeight="bold">
                                            Nama filenya: {selectedFile.name}
                                        </Text>
                                    )}
                                </HStack>
                            </FormControl>
                        </Stack>
                    </Center>
                    <HStack>
                        <Container>
                            <Input mt={4} mb={2} placeholder='Cindut mau nama filenya apaa' onChange={(e) => handleFilename(e.target.value)} size='md' />
                            <Input placeholder='Cindut mau nama zipnya apaa' onChange={(e) => handleZipName(e.target.value)} size='md' />
                        </Container>
                    <Button size={"lg"} backgroundColor='pink.50' onClick={(e) => handleMerge()}>Merge</Button>
                    </HStack>

                    {stateLoading? <Center>
                        <HStack mt={5}>
                            <Text>Loading bentar yaaa</Text>
                            <Spinner color='pink.50' thickness={4} />
                        </HStack>
                    </Center> : 
                        <Center>
                            <VStack mt={5}>
                                <Text>Prosesnya uda celese semua ❤</Text>
                                {/* <Spinner color='pink.50' thickness={4} /> */}
                            </VStack>
                        </Center>
                    }
                </CardBody>
            </Card>
        </Center>
    </Container>
  );
}
