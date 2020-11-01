<template>
    <div>
        <h1>test page</h1>
        <PageForm :options="pageFormOptions" />
        <br />
        <Table border :columns="columns7" :data="data6"></Table>
        <br />
        <Upload :action="uploadUrl" :on-success="onUploadSuccess">
            <Button icon="ios-cloud-upload-outline">上传文件</Button>
        </Upload>
        <br />
        <div class="del-file">
            <span>文件地址:</span>
            <Input v-model="delUpload"></Input>
            <Button type="error" @click="delFile">删除文件</Button>
        </div>
    </div>
</template>

<script>
import PageForm from '@/components/pageForm/PageForm.view.vue'
import { httpUrl } from '@/module/systemConfig/SystemConfig.module.js'
export default {
    name: 'test',

    components: { PageForm },

    data() {
        return {
            pageFormOptions: {
                loading: false,
                inline: true,
                config: [
                    {
                        id: 'userName',
                        type: 'input',
                        name: '账号',
                        options: {
                            value: ''
                        }
                    },
                    {
                        id: 'userName1',
                        name: '账号1',
                        type: 'select',
                        options: {
                            value: '',
                            list: [
                                {
                                    label: '测试1',
                                    value: '1'
                                },
                                {
                                    label: '测试2',
                                    value: '2'
                                },
                                {
                                    label: '测试3',
                                    value: '3'
                                }
                            ]
                        }
                    },
                    {
                        id: 'submit',
                        name: '查询',
                        type: 'button',
                        options: {
                            icon: 'ios-search',
                            click(config) {
                                return new Promise((resolve, reject) => {
                                    resolve()
                                })
                            }
                        }
                    },
                    {
                        id: 'userName3fff',
                        name: '时间',
                        type: 'datePicker',
                        options: {
                            value: []
                        }
                    },
                    {
                        id: 'userName3dcd',
                        name: '时间',
                        type: 'datePicker',
                        options: {
                            value: []
                        }
                    },
                    {
                        id: 'userName3dcd',
                        name: '时间',
                        type: 'datePicker',
                        options: {
                            value: []
                        }
                    },
                    {
                        id: 'cdscdscds',
                        name: '时间',
                        type: 'datePicker',
                        options: {
                            value: []
                        }
                    },
                    {
                        id: 'hhgghfdgfh',
                        name: '时间',
                        type: 'datePicker',
                        options: {
                            value: []
                        }
                    },
                    {
                        id: 'userName3',
                        name: '时间',
                        type: 'datePicker',
                        options: {
                            value: []
                        }
                    },
                    {
                        id: 'userName4',
                        name: '账号4',
                        type: 'switch',
                        options: {
                            value: false
                        }
                    },
                    {
                        id: 'userName4',
                        name: '账号4',
                        type: 'switch',
                        options: {
                            value: false
                        }
                    },
                    {
                        id: 'userName4',
                        name: '账号4',
                        type: 'switch',
                        options: {
                            value: false
                        }
                    },
                    {
                        id: 'userName4',
                        name: '账号4',
                        type: 'switch',
                        options: {
                            value: false
                        }
                    },
                    {
                        id: 'userName4',
                        name: '账号4',
                        type: 'switch',
                        options: {
                            value: false
                        }
                    },
                    {
                        id: 'userName4',
                        name: '账号4',
                        type: 'switch',
                        options: {
                            value: false
                        }
                    },
                    {
                        id: 'userName4',
                        name: '账号4',
                        type: 'switch',
                        options: {
                            value: false
                        }
                    },
                    {
                        id: 'userName4',
                        name: '账号4',
                        type: 'switch',
                        options: {
                            value: false
                        }
                    },
                    {
                        id: 'userName4',
                        name: '账号4',
                        type: 'switch',
                        options: {
                            value: false
                        }
                    },
                    {
                        id: 'userName4',
                        name: '账号4',
                        type: 'switch',
                        options: {
                            value: false
                        }
                    },
                    {
                        id: 'userName4',
                        name: '账号4',
                        type: 'switch',
                        options: {
                            value: false
                        }
                    },
                    {
                        id: 'userName4',
                        name: '账号4',
                        type: 'switch',
                        options: {
                            value: false
                        }
                    },
                    {
                        id: 'userName4',
                        name: '账号4',
                        type: 'switch',
                        options: {
                            value: false
                        }
                    },
                    {
                        id: 'userName4',
                        name: '账号4',
                        type: 'switch',
                        options: {
                            value: false
                        }
                    },
                    {
                        id: 'userName4',
                        name: '账号4',
                        type: 'switch',
                        options: {
                            value: false
                        }
                    },
                    {
                        id: 'userName4',
                        name: '账号4',
                        type: 'switch',
                        options: {
                            value: false
                        }
                    },
                    {
                        id: 'userName4',
                        name: '账号4',
                        type: 'switch',
                        options: {
                            value: false
                        }
                    },
                    {
                        id: 'userName4',
                        name: '账号4',
                        type: 'switch',
                        options: {
                            value: false
                        }
                    },
                    {
                        id: 'userName4',
                        name: '账号4',
                        type: 'switch',
                        options: {
                            value: false
                        }
                    }
                ]
            },
            columns7: [
                {
                    title: 'Age',
                    key: 'age'
                },
                {
                    title: 'Address',
                    key: 'address',
                    render(h) {
                        return <div>{1}</div>
                    }
                }
            ],
            data6: [
                {
                    name: 'John Brown',
                    age: 18,
                    address: 'New York No. 1 Lake Park'
                },
                {
                    name: 'Jim Green',
                    age: 24,
                    address: 'London No. 1 Lake Park'
                },
                {
                    name: 'Joe Black',
                    age: 30,
                    address: 'Sydney No. 1 Lake Park'
                },
                {
                    name: 'Jon Snow',
                    age: 26,
                    address: 'Ottawa No. 2 Lake Park'
                }
            ],
            uploadUrl: httpUrl.uploadUrl,
            delUpload: ''
        }
    },
    methods: {
        onUploadSuccess(response) {
            this.$Notice.success({
                title: '成功',
                desc: '文件上传成功'
            })
            this.delUpload = response.path
            console.log(response)
        },
        delFile() {
            this.$http.post(httpUrl.delUploadUrl, { stringValue: this.delUpload }).then(data => {
                if (data.data.code === 0) {
                    this.$Notice.success({
                        title: '成功',
                        desc: '文件删除成功'
                    })
                    this.delUpload = ''
                }
            })
        }
    }
}
</script>

<style lang="less">
.del-file {
    display: flex;
    justify-content: flex-start;
    align-content: center;
    align-items: center;
    .ivu-input-wrapper {
      width: 500px;
      margin: 0 10px;
    }
}
</style>
