import { Button,Alert, AlertIcon,HStack, AlertTitle, AlertDescription, ButtonGroup,Input, Table, TableCaption, Thead, Tbody, Tr, Th, Td, Tfoot,Checkbox, Card, CardBody, Text, CardFooter, Container, Divider, Heading, Stack, Center, Flex, TableContainer } from "@chakra-ui/react";

import axios from "axios";

import Image from "next/image";

import { useEffect, useState } from "react";

import { useDropzone } from "react-dropzone";



import catImage from "assets/wallpaper-cat-1.png"
import trashIcon from "assets/trash.svg"

export default function Home() {
    const [filename, setFilename] = useState("");
    const [fileCollections, setFileCollections] = useState([]);

    useEffect(() => {
        getFileCollection();
    }, [])


    function getFileCollection(){
        axios({
            method: 'GET',
            url: 'http://127.0.0.1:5000/filename',
          })
        .then((res) => {
            setFileCollections(res.data.filenames)
            setCheckedItems(Array(res.data.filenames.length).fill(false));
        }).catch((err) => {
            console.log(err)
        })
    }
    function handleNaik(index){
        if (index !== 0){
            const newCollections = [...fileCollections];
            newCollections[index-1] = newCollections[index]
            newCollections[index] = fileCollections[index-1]
            setFileCollections(newCollections)
        }else{
            console.log("")
        }
    }

    const handleUpload = (acceptedFiles) => {
        for (let i = 0; i < acceptedFiles.length; i++){
            const formData = new FormData();
            formData.append("file", acceptedFiles[i]);
            axios({
                method: 'POST',
                url: 'http://127.0.0.1:5000/upload',
                data: formData,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
              })
            .then((res) => {
                console.log(res)
            }).catch((err) => {
                console.log(err)
            })
        }
        window.location.reload()
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop: handleUpload });

    function handleDelete(index){
        let payload = {
            filename: fileCollections[index]
        }
        axios({
            method: 'DELETE',
            url: 'http://127.0.0.1:5000/delete',
            data: payload,
          })
        .then((res) => {
            console.log(res)
        }).catch((err) => {
            console.log(err)
        })

        const newCollections = [...fileCollections]
        newCollections.splice(index, 1);
        setFileCollections(newCollections)
    }

    function handleFilename(value){
        setFilename(value)
    }

    function handleMerge(){
        let payload = {
            pdf_files: fileCollections,
            pdf_name: filename
        }
        axios({
            method: 'POST',
            url: 'http://127.0.0.1:5000/merge',
            data: payload,
          })
        .then((res) => {
            console.log(res.data.message)
        }).catch((err) => {
            console.log(err)
        })
        window.location.reload()
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
                    <Stack mt='6' spacing='3'>
                        <HStack spacing="4" alignItems="center" justify="center"> {/* HStack for inline content */}
                            <Text size='md' textAlign={"center"}>
                                Ini buat milih file dari di komputer cindut
                            </Text>
                            <div {...getRootProps()}>
                                <input {...getInputProps()} />
                                <Button backgroundColor='pink'>Apludd</Button>
                            </div>
                        </HStack>
                        
                        <TableContainer>
                            <Table variant="simple">
                                <Thead bg="pink.50">
                                    <Tr>
                                        <Th textAlign="center">Nama File</Th>
                                        <Th textAlign="center">Naik?</Th>
                                        <Th textAlign="center">Dihapus aja?</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {fileCollections.map((file, index) => (
                                        <Tr key={file}>
                                            <Td>{file}</Td>
                                            <Td>
                                                <Button onClick={(e) => handleNaik(index)}>Naik</Button>
                                            </Td>
                                            <Td textAlign="center">
                                                <Button onClick={(e) => handleDelete(index)}>
                                                    <Image
                                                        src={trashIcon}
                                                        alt="logo sampaa"
                                                    />
                                                </Button>
                                            </Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </Stack>
                </CardBody>
                <CardFooter>
                    <Container>
                        <Input placeholder='Cindut mau nama filenya apaa' onChange={(e) => handleFilename(e.target.value)} size='md' />
                    </Container>
                    <Button backgroundColor='pink' onClick={(e) => handleMerge()}>Merge</Button>
                </CardFooter>
            </Card>
        </Center>
    </Container>
  );
}
